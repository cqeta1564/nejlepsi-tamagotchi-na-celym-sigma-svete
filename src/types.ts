export type AppScreen = 'selection' | 'home'

export type PetStatKey = 'food' | 'health' | 'happiness' | 'energy'

export type PetMood = 'happy' | 'hungry' | 'sleepy' | 'sick'

export type PetStatus =
  | 'thriving'
  | 'stable'
  | 'hungry'
  | 'sleepy'
  | 'critical'
  | 'game-over'

export type PetActionType = 'feed' | 'heal' | 'play' | 'sleep'
export type RoomId = 'kitchen' | 'corner-shop' | 'station-park' | 'casino'

export interface PetStats {
  food: number
  health: number
  happiness: number
  energy: number
}

export interface PetBase {
  id: string
  name: string
  species: string
  description: string
  image: string
  stats: PetStats
}

export interface Pet extends PetBase {
  mood: PetMood
  status: PetStatus
  alive: boolean
  statusMessage: string
}

export type PetSeed = Omit<Pet, 'alive' | 'status' | 'statusMessage'>

export interface PetAction {
  id: PetActionType
  label: string
  description: string
  effects: Partial<Record<PetStatKey, number>>
}

export interface Room {
  id: RoomId
  name: string
  description: string
  actionId: PetActionType
}

export interface GameState {
  currentScreen: AppScreen
  selectedPetId: string | null
  currentRoomIndex: number
  pets: Pet[]
}
