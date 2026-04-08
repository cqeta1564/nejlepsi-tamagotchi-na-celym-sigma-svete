import type { Room } from '../types'

export const rooms: Room[] = [
  {
    id: 'kitchen',
    name: 'Kuchyn',
    description: 'Tady se dobre ji a doplnuje energie.',
    actionId: 'feed',
  },
  {
    id: 'corner-shop',
    name: 'Vecerka',
    description: 'Rychla pomoc, kdyz zdravi potrebuje podporu.',
    actionId: 'heal',
  },
  {
    id: 'station-park',
    name: 'Hlavni nadrazi park',
    description: 'Idealni misto na zabavu a zvednuti nalady.',
    actionId: 'play',
  },
  {
    id: 'casino',
    name: 'Kasino',
    description: 'Po dlouhe noci je nejlepsi dat si poradny odpocinek.',
    actionId: 'sleep',
  },
]
