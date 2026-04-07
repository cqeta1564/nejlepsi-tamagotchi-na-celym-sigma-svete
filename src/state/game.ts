import { mockPets } from '../data/pets'
import type { GameState, Pet, PetAction, PetMood, PetStatKey, PetStats } from '../types'

export const STORAGE_KEY = 'sigma-tamagotchi-state'
export const TICK_INTERVAL_MS = 5000

const MAX_STAT = 100
const MIN_STAT = 0
const LOW_STAT_THRESHOLD = 24
const DEFAULT_SELECTED_PET_ID = mockPets[0]?.id ?? null

const BASE_DECAY: Record<'food' | 'happiness' | 'energy', number> = {
  food: 6,
  happiness: 4,
  energy: 5,
}

export type GameAction =
  | {
      type: 'selectPet'
      petId: string
    }
  | {
      type: 'confirmSelection'
    }
  | {
      type: 'returnToSelection'
    }
  | {
      type: 'performAction'
      action: PetAction
    }
  | {
      type: 'tick'
    }
  | {
      type: 'reset'
    }

type PartialPet = Partial<Pet> & {
  stats?: Partial<PetStats>
}

export function createInitialGameState(): GameState {
  return {
    currentScreen: 'selection',
    selectedPetId: DEFAULT_SELECTED_PET_ID,
    pets: mockPets.map((pet) => normalizePet(pet, pet)),
  }
}

export function sanitizeGameState(input: GameState): GameState {
  const persistedPets = Array.isArray(input?.pets) ? input.pets : []

  const pets = mockPets.map((fallbackPet) => {
    const persistedPet = persistedPets.find((pet) => pet?.id === fallbackPet.id)

    return normalizePet(persistedPet, fallbackPet)
  })

  const selectedPetId = pets.some((pet) => pet.id === input?.selectedPetId)
    ? input.selectedPetId
    : DEFAULT_SELECTED_PET_ID

  const currentScreen =
    input?.currentScreen === 'home' && selectedPetId !== null
      ? 'home'
      : 'selection'

  return {
    currentScreen,
    selectedPetId,
    pets,
  }
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'selectPet':
      if (!state.pets.some((pet) => pet.id === action.petId)) {
        return state
      }

      return {
        ...state,
        selectedPetId: action.petId,
      }

    case 'confirmSelection':
      if (state.selectedPetId === null) {
        return state
      }

      return {
        ...state,
        currentScreen: 'home',
      }

    case 'returnToSelection':
      return {
        ...state,
        currentScreen: 'selection',
      }

    case 'performAction':
      return updateSelectedPet(state, (pet) =>
        pet.stats.health > MIN_STAT ? applyActionToPet(pet, action.action) : pet,
      )

    case 'tick':
      if (state.currentScreen !== 'home') {
        return state
      }

      return updateSelectedPet(state, (pet) =>
        pet.stats.health > MIN_STAT ? tickPet(pet) : pet,
      )

    case 'reset':
      return createInitialGameState()

    default:
      return state
  }
}

export function getSelectedPet(state: GameState) {
  return state.pets.find((pet) => pet.id === state.selectedPetId) ?? null
}

export function isPetAlive(pet: Pet | null): pet is Pet {
  return Boolean(pet && pet.stats.health > MIN_STAT)
}

function updateSelectedPet(
  state: GameState,
  updatePet: (pet: Pet) => Pet,
): GameState {
  if (state.selectedPetId === null) {
    return state
  }

  return {
    ...state,
    pets: state.pets.map((pet) =>
      pet.id === state.selectedPetId ? updatePet(pet) : pet,
    ),
  }
}

function applyActionToPet(pet: Pet, action: PetAction) {
  const nextStats: PetStats = { ...pet.stats }

  for (const statKey of Object.keys(action.effects) as PetStatKey[]) {
    const effect = action.effects[statKey]

    if (typeof effect !== 'number') {
      continue
    }

    nextStats[statKey] = clampStat(nextStats[statKey] + effect)
  }

  return buildPetFromStats(pet, nextStats)
}

function tickPet(pet: Pet) {
  const nextStats: PetStats = {
    food: clampStat(pet.stats.food - BASE_DECAY.food),
    health: pet.stats.health,
    happiness: clampStat(pet.stats.happiness - BASE_DECAY.happiness),
    energy: clampStat(pet.stats.energy - BASE_DECAY.energy),
  }

  let healthPenalty = 0

  if (nextStats.food <= LOW_STAT_THRESHOLD) {
    healthPenalty += 6
  }

  if (nextStats.energy <= LOW_STAT_THRESHOLD) {
    healthPenalty += 6
  }

  if (nextStats.happiness <= LOW_STAT_THRESHOLD) {
    healthPenalty += 4
  }

  nextStats.health = clampStat(nextStats.health - healthPenalty)

  return buildPetFromStats(pet, nextStats)
}

function normalizePet(pet: PartialPet | undefined, fallbackPet: Pet): Pet {
  const stats = normalizeStats(pet?.stats, fallbackPet.stats)

  return {
    id: typeof pet?.id === 'string' ? pet.id : fallbackPet.id,
    name: typeof pet?.name === 'string' ? pet.name : fallbackPet.name,
    species:
      typeof pet?.species === 'string' ? pet.species : fallbackPet.species,
    description:
      typeof pet?.description === 'string'
        ? pet.description
        : fallbackPet.description,
    image: typeof pet?.image === 'string' ? pet.image : fallbackPet.image,
    mood: deriveMood(stats),
    stats,
  }
}

function normalizeStats(
  stats: Partial<PetStats> | undefined,
  fallbackStats: PetStats,
): PetStats {
  return {
    food: clampStat(
      typeof stats?.food === 'number' ? stats.food : fallbackStats.food,
    ),
    health: clampStat(
      typeof stats?.health === 'number' ? stats.health : fallbackStats.health,
    ),
    happiness: clampStat(
      typeof stats?.happiness === 'number'
        ? stats.happiness
        : fallbackStats.happiness,
    ),
    energy: clampStat(
      typeof stats?.energy === 'number' ? stats.energy : fallbackStats.energy,
    ),
  }
}

function buildPetFromStats(pet: Pet, stats: PetStats): Pet {
  return {
    ...pet,
    stats,
    mood: deriveMood(stats),
  }
}

function deriveMood(stats: PetStats): PetMood {
  if (stats.health <= LOW_STAT_THRESHOLD) {
    return 'sick'
  }

  if (stats.energy <= LOW_STAT_THRESHOLD) {
    return 'sleepy'
  }

  if (stats.food <= LOW_STAT_THRESHOLD) {
    return 'hungry'
  }

  return 'happy'
}

function clampStat(value: number) {
  return Math.min(MAX_STAT, Math.max(MIN_STAT, Math.round(value)))
}
