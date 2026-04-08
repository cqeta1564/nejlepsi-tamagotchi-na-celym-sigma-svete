import type { PetSeed } from '../types'

export const mockPets: PetSeed[] = [
  {
    id: 'pet-1',
    name: 'Mochi',
    species: 'Cat',
    description: 'Playful pet that loves attention and naps in sunny spots.',
    mood: 'happy',
    image: '/images/pets/mochi.png',
    stats: {
      food: 78,
      health: 92,
      happiness: 95,
      energy: 70,
    },
  },
  {
    id: 'pet-2',
    name: 'Pixel',
    species: 'Fox',
    description: 'Curious pet that explores everything and gets hungry fast.',
    mood: 'hungry',
    image: '/images/pets/pixel.png',
    stats: {
      food: 34,
      health: 84,
      happiness: 73,
      energy: 67,
    },
  },
  {
    id: 'pet-3',
    name: 'Bublina',
    species: 'Axolotl',
    description: 'Calm pet that likes quiet moments and long underwater rests.',
    mood: 'sleepy',
    image: '/images/pets/bublina.png',
    stats: {
      food: 61,
      health: 88,
      happiness: 69,
      energy: 42,
    },
  },
]
