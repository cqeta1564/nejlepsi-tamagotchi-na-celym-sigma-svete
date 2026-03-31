export type AppScreen = 'selection' | 'home'

export type PetStatKey = 'food' | 'health' | 'happiness' | 'energy'

export type PetMood = 'happy' | 'hungry' | 'sleepy' | 'sick'

export type PetActionType = 'feed' | 'heal' | 'play' | 'sleep'

export interface PetStats {
  food: number
  health: number
  happiness: number
  energy: number
}

export interface Pet {
  id: string
  name: string
  species: string
  description: string
  mood: PetMood
  image: string
  stats: PetStats
}

export interface PetAction {
  id: PetActionType
  label: string
  description: string
  effects: Partial<Record<PetStatKey, number>>
}

export interface GameState {
  currentScreen: AppScreen
  selectedPetId: string | null
  pets: Pet[]
}
