import bobekImage from '../assets/bobek.webp'
import bojkaImage from '../assets/bojka.webp'
import gumaImage from '../assets/guma.webp'
import type { Pet } from '../types'

export const mockPets: Pet[] = [
  {
    id: 'pet-1',
    name: 'Bobek',
    species: 'Chaos blob',
    description: 'Mazlicek, co vypada nevinne, ale vzdycky vymysli nejaky maly prusvih.',
    mood: 'happy',
    image: bobekImage,
    stats: {
      food: 78,
      health: 92,
      happiness: 30,
      energy: 64,
    },
  },
  {
    id: 'pet-2',
    name: 'Indicka pneumatika',
    species: 'Poulicni pneu',
    description: 'Tvrdy mazlicek se srdcem ze zavodni drahy a apetitem na dobrodruzstvi.',
    mood: 'hungry',
    image: gumaImage,
    stats: {
      food: 34,
      health: 50,
      happiness: 10,
      energy: 67,
    },
  },
  {
    id: 'pet-3',
    name: 'Bojka',
    species: 'Pristavni strazce',
    description: 'Klidny vodni partak, ktery hlida hladinu a sbira naladu z kazde vlny.',
    mood: 'sleepy',
    image: bojkaImage,
    stats: {
      food: 61,
      health: 88,
      happiness: 69,
      energy: 42,
    },
  },
]
