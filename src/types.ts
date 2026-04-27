export type AppScreen = 'selection' | 'home'

export type PetMood = 'happy' | 'hungry' | 'sleepy' | 'sick'

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

export interface GameState {
  currentScreen: AppScreen
  selectedPetId: string | null
  pets: Pet[]
}
