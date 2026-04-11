import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import PetSelectionScreen from './screens/PetSelectionScreen'
import HomeScreen from './screens/HomeScreen'
import StatusModal from './components/StatusModal'
import { petActions } from './data/actions'
import { mockPets } from './data/pets'
import { COLORS } from './theme'
import type { GameState, Pet, PetAction, PetMood, PetStats } from './types'

const STORAGE_KEY = 'tamagotchi-mvp-state'

const initialGameState: GameState = {
  currentScreen: 'selection',
  selectedPetId: null,
  pets: mockPets,
}

type AppTone = 'loading' | 'success' | 'error'

type AppStatus = {
  tone: AppTone
  message: string
}

type ModalState = {
  isOpen: boolean
  title: string
  message: string
}

const themeVariables = {
  '--color-primary': COLORS.primary,
  '--color-background': COLORS.background,
  '--color-surface': COLORS.surface,
  '--color-border': COLORS.border,
  '--color-text-primary': COLORS.text.primary,
  '--color-text-secondary': COLORS.text.secondary,
  '--color-status-loading': COLORS.status.loading,
  '--color-status-error': COLORS.status.error,
  '--color-status-success': COLORS.status.success,
  '--color-stat-hunger': COLORS.stats.hunger,
  '--color-stat-health': COLORS.stats.health,
  '--color-stat-energy': COLORS.stats.energy,
  '--color-stat-happiness': COLORS.stats.happiness,
} as CSSProperties

function App() {
  const [gameState, setGameState] = useState<GameState>(initialGameState)
  const [isHydrated, setIsHydrated] = useState(false)
  const [appStatus, setAppStatus] = useState<AppStatus>({
    tone: 'loading',
    message: 'Pripravuji tvuj virtualni domecek.',
  })
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: '',
    message: '',
  })

  const selectedPet =
    gameState.pets.find((pet) => pet.id === gameState.selectedPetId) ?? null

  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(STORAGE_KEY)

      if (!storedValue) {
        setAppStatus({
          tone: 'success',
          message: 'Nova hra je pripravena. Vyber si mazlicka.',
        })
        setIsHydrated(true)
        return
      }

      const parsedValue = JSON.parse(storedValue)

      if (!isGameState(parsedValue)) {
        throw new Error('Neplatny tvar ulozenych dat.')
      }

      setGameState(parsedValue)
      setAppStatus({
        tone: 'success',
        message: 'Ulozeny stav jsme uspesne obnovili.',
      })
    } catch (error) {
      console.error(error)
      setGameState(initialGameState)
      setAppStatus({
        tone: 'error',
        message: 'Ulozeny stav se nepodarilo nacist.',
      })
      setModalState({
        isOpen: true,
        title: 'Data se nepodarilo obnovit',
        message:
          'Spoustime cistou hru. Rozbite nebo zastarale ulozene hodnoty jsme ignorovali, aby aplikace zustala pouzitelna.',
      })
    } finally {
      setIsHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) {
      return
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState))
    } catch (error) {
      console.error(error)
      setAppStatus({
        tone: 'error',
        message: 'Zmeny se nepodarilo ulozit do prohlizece.',
      })
    }
  }, [gameState, isHydrated])

  function handleSelectPet(petId: string) {
    setGameState((currentState) => ({
      ...currentState,
      selectedPetId: petId,
    }))
    setAppStatus({
      tone: 'success',
      message: 'Mazlicek je pripraveny ke startu.',
    })
  }

  function handleConfirmSelection() {
    if (!gameState.selectedPetId) {
      return
    }

    const confirmedPet =
      gameState.pets.find((pet) => pet.id === gameState.selectedPetId) ?? null

    setGameState((currentState) => ({
      ...currentState,
      currentScreen: 'home',
    }))
    setAppStatus({
      tone: 'success',
      message: 'Dobrodruzstvi zacina. Stav se uklada automaticky.',
    })

    if (confirmedPet) {
      setModalState({
        isOpen: true,
        title: `Vitej, ${confirmedPet.name}!`,
        message:
          'Mazlicek je pripraveny na prvni akce. Sleduj statistiky a reaguj driv, nez budou padat do cervenych hodnot.',
      })
    }
  }

  function handleChangePet() {
    setGameState((currentState) => ({
      ...currentState,
      currentScreen: 'selection',
    }))
    setAppStatus({
      tone: 'loading',
      message: 'Muzes zvolit jineho mazlicka.',
    })
  }

  function handleResetGame() {
    window.localStorage.removeItem(STORAGE_KEY)
    setGameState(initialGameState)
    setAppStatus({
      tone: 'success',
      message: 'Nova hra je pripravena od zacatku.',
    })
    setModalState({
      isOpen: true,
      title: 'Nova hra',
      message:
        'Predchozi ulozeny postup jsme smazali. Vyber si mazlicka a muzes zacit znovu.',
    })
  }

  function handleActionClick(actionId: PetAction['id']) {
    if (!selectedPet) {
      return
    }

    const action = petActions.find((item) => item.id === actionId)

    if (!action) {
      return
    }

    const updatedPets = gameState.pets.map((pet) => {
      if (pet.id !== selectedPet.id) {
        return pet
      }

      const nextStats = applyActionToStats(pet.stats, action.effects)

      return {
        ...pet,
        stats: nextStats,
        mood: getMoodFromStats(nextStats),
      }
    })

    const updatedPet =
      updatedPets.find((pet) => pet.id === selectedPet.id) ?? selectedPet

    setGameState((currentState) => ({
      ...currentState,
      pets: updatedPets,
    }))

    setAppStatus({
      tone: 'success',
      message: `${action.label} probehlo uspesne.`,
    })
    setModalState({
      isOpen: true,
      title: `${updatedPet.name} reaguje na akci`,
      message: getActionFeedback(updatedPet, action.label),
    })
  }

  function closeModal() {
    setModalState((currentState) => ({
      ...currentState,
      isOpen: false,
    }))
  }

  return (
    <div className="app-shell" style={themeVariables}>
      <div className="app-shell__backdrop" aria-hidden="true" />

      <div className="app-layout">
        <header className="app-header">
          <div>
            <p className="app-header__eyebrow">Virtualni Tamagotchi</p>
            <h1>Pece o digitalniho partaka v prohlizeci</h1>
            <p className="app-header__intro">
              Minimalni verze hry s vyberem mazlicka, statistikami, akcemi a
              automatickym ukladanim do local storage.
            </p>
          </div>

          <div className="app-header__meta">
            <span className={`status-pill status-pill--${appStatus.tone}`}>
              {appStatus.message}
            </span>

            {gameState.currentScreen === 'home' ? (
              <button
                type="button"
                className="secondary-button"
                onClick={handleChangePet}
              >
                Zmenit mazlicka
              </button>
            ) : null}
          </div>
        </header>

        <main className="app-main">
          {gameState.currentScreen === 'selection' ? (
            <PetSelectionScreen
              pets={gameState.pets}
              selectedPetId={gameState.selectedPetId}
              onSelectPet={handleSelectPet}
              onConfirmSelection={handleConfirmSelection}
            />
          ) : selectedPet ? (
            <HomeScreen
              pet={selectedPet}
              actions={petActions}
              onActionClick={handleActionClick}
            />
          ) : (
            <PetSelectionScreen
              pets={gameState.pets}
              selectedPetId={gameState.selectedPetId}
              onSelectPet={handleSelectPet}
              onConfirmSelection={handleConfirmSelection}
            />
          )}
        </main>

        <footer className="app-footer">
          <p>
            Stav mazlicka se uklada po kazde akci. U layoutu je pripraveny
            mobile-first zaklad pro dalsi rozsireni obrazovek.
          </p>

          <button
            type="button"
            className="ghost-button"
            onClick={handleResetGame}
          >
            Nova hra
          </button>
        </footer>
      </div>

      <StatusModal
        isOpen={modalState.isOpen}
        title={modalState.title}
        message={modalState.message}
        onClose={closeModal}
      />
    </div>
  )
}

type StatEffects = Partial<Record<keyof PetStats, number>>

function applyActionToStats(stats: PetStats, effects: StatEffects): PetStats {
  return {
    food: clampStat(stats.food + (effects.food ?? 0)),
    health: clampStat(stats.health + (effects.health ?? 0)),
    happiness: clampStat(stats.happiness + (effects.happiness ?? 0)),
    energy: clampStat(stats.energy + (effects.energy ?? 0)),
  }
}

function clampStat(value: number) {
  return Math.max(0, Math.min(100, value))
}

function getMoodFromStats(stats: PetStats): PetMood {
  if (stats.health <= 35) {
    return 'sick'
  }

  if (stats.energy <= 35) {
    return 'sleepy'
  }

  if (stats.food <= 40) {
    return 'hungry'
  }

  return 'happy'
}

function getActionFeedback(pet: Pet, actionLabel: string) {
  const moodMessages: Record<PetMood, string> = {
    happy: `${pet.name} vypada spokojene. Akce "${actionLabel}" zafungovala presne podle planu.`,
    hungry: `${pet.name} se uklidnil, ale stale by ocenil dalsi peci kolem jidla.`,
    sleepy: `${pet.name} ziskal trochu klidu. Energie je stale dulezita, tak ji sleduj dal.`,
    sick: `${pet.name} potrebuje jemne tempo a dalsi peci. Zdravi je ted nejvyssi priorita.`,
  }

  return moodMessages[pet.mood]
}

function isGameState(value: unknown): value is GameState {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as Partial<GameState>

  return (
    (candidate.currentScreen === 'selection' ||
      candidate.currentScreen === 'home') &&
    (candidate.selectedPetId === null ||
      typeof candidate.selectedPetId === 'string') &&
    Array.isArray(candidate.pets) &&
    candidate.pets.every(isPet)
  )
}

function isPet(value: unknown): value is Pet {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as Partial<Pet>

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.species === 'string' &&
    typeof candidate.description === 'string' &&
    typeof candidate.image === 'string' &&
    isPetMood(candidate.mood) &&
    isPetStats(candidate.stats)
  )
}

function isPetMood(value: unknown): value is PetMood {
  return (
    value === 'happy' ||
    value === 'hungry' ||
    value === 'sleepy' ||
    value === 'sick'
  )
}

function isPetStats(value: unknown): value is PetStats {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as Partial<PetStats>

  return (
    typeof candidate.food === 'number' &&
    typeof candidate.health === 'number' &&
    typeof candidate.happiness === 'number' &&
    typeof candidate.energy === 'number'
  )
}

export default App
