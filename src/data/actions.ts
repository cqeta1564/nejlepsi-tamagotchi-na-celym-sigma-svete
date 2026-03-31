import type { PetAction } from '../types'

export const petActions: PetAction[] = [
  {
    id: 'feed',
    label: 'Nakrm',
    description: 'Prida jidlo a trochu energie.',
    effects: {
      food: 20,
      energy: 5,
    },
  },
  {
    id: 'heal',
    label: 'Uzdrav',
    description: 'Zlepsi zdravi mazlicka.',
    effects: {
      health: 18,
    },
  },
  {
    id: 'play',
    label: 'Hraj si',
    description: 'Zvysi stesti, ale trochu ubere energii.',
    effects: {
      happiness: 22,
      energy: -8,
    },
  },
  {
    id: 'sleep',
    label: 'Spi',
    description: 'Doplni energii.',
    effects: {
      energy: 25,
    },
  },
]
