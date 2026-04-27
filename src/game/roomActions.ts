import type { PetMood, PetStats } from '../types.js'

export type RoomId = 'kitchen' | 'store' | 'park' | 'casino'

export const ROOM_ACTION_COSTS = {
  kitchen: 8,
  store: 10,
  park: 12,
  casino: 15,
} satisfies Record<RoomId, number>

export type RoomActionResult = {
  stats: PetStats
  coins: number
  message: string
}

export function executeRoomAction(
  roomId: RoomId,
  stats: PetStats,
  currentCoins: number,
  casinoRoll = Math.random(),
): RoomActionResult {
  const paidCoins = Math.max(0, currentCoins - ROOM_ACTION_COSTS[roomId])

  if (roomId === 'kitchen') {
    const nextStats = {
      food: clampStat(stats.food + 28),
      health: clampStat(stats.health - 2),
      happiness: clampStat(stats.happiness + 2),
      energy: clampStat(stats.energy + 6),
    }

    return {
      stats: nextStats,
      coins: paidCoins,
      message: 'Kafe s cigem doplnilo hlad. Je to sice trochu cursed, ale zabralo to.',
    }
  }

  if (roomId === 'store') {
    const nextStats = {
      food: clampStat(stats.food - 2),
      health: clampStat(stats.health - 1),
      happiness: clampStat(stats.happiness + 4),
      energy: clampStat(stats.energy + 30),
    }

    return {
      stats: nextStats,
      coins: paidCoins,
      message: 'Bily monster nakopl energii. Mazlicek ted vypada podstatne vic vzhuru.',
    }
  }

  if (roomId === 'park') {
    const nextStats = {
      food: clampStat(stats.food - 4),
      health: clampStat(stats.health + 24),
      happiness: clampStat(stats.happiness + 8),
      energy: clampStat(stats.energy - 5),
    }

    return {
      stats: nextStats,
      coins: paidCoins,
      message: 'Piko v parku na hlavnim nadrazi zvedlo zdravi. Ano, tenhle mazlicek je fakt sigma projekt.',
    }
  }

  const coinsDelta =
    casinoRoll > 0.82 ? 35 : casinoRoll > 0.52 ? 10 : casinoRoll > 0.24 ? 0 : -8
  const nextStats = {
    food: clampStat(stats.food - 3),
    health: clampStat(stats.health - 2),
    happiness: clampStat(stats.happiness + 26),
    energy: clampStat(stats.energy - 4),
  }
  const nextCoins = Math.max(0, paidCoins + coinsDelta)

  return {
    stats: nextStats,
    coins: nextCoins,
    message:
      coinsDelta > 10
        ? 'Automat se urval a trefil jackpot. Stesti vyletelo nahoru a penize taky.'
        : coinsDelta > 0
          ? 'Automat doplnil stesti a neco malo vysypal i do penezenky.'
          : coinsDelta === 0
            ? 'Stesti slo nahoru, ale penezenka zustala skoro beze zmeny.'
            : 'Stesti se sice zvedlo, ale automat cast penez sezral.',
  }
}

export function clampStat(value: number) {
  return Math.max(0, Math.min(100, value))
}

export function getMoodFromStats(stats: PetStats): PetMood {
  if (stats.health <= 25 || stats.energy <= 20) {
    return 'sick'
  }

  if (stats.energy <= 40) {
    return 'sleepy'
  }

  if (stats.food <= 40) {
    return 'hungry'
  }

  return 'happy'
}

export function hasAnyZeroStat(stats: PetStats) {
  return Object.values(stats).some((value) => value <= 0)
}
