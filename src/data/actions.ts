import type { PetAction } from '../types'

export const petActions: PetAction[] = [
  {
    id: 'feed',
    label: 'Nakrmit',
    description: 'Doplni jidlo a trochu energie.',
    effects: {
      food: 28,
      energy: 6,
    },
  },
  {
    id: 'heal',
    label: 'Uzdravit',
    description: 'Vrati cast zdravi a trosku zvedne naladu.',
    effects: {
      health: 24,
      happiness: 8,
    },
  },
  {
    id: 'play',
    label: 'Hrat si',
    description: 'Zvedne naladu, ale ubere trochu energie.',
    effects: {
      happiness: 24,
      energy: -8,
    },
  },
  {
    id: 'sleep',
    label: 'Nechat spat',
    description: 'Doplni energii a pomuze se zotavenim.',
    effects: {
      energy: 30,
      health: 10,
    },
  },
]
