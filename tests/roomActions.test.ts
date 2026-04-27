import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  ROOM_ACTION_COSTS,
  clampStat,
  executeRoomAction,
  getMoodFromStats,
  hasAnyZeroStat,
} from '../src/game/roomActions.js'
import type { PetStats } from '../src/types.js'

const baseStats: PetStats = {
  food: 72,
  health: 90,
  happiness: 80,
  energy: 64,
}

describe('stat helpers', () => {
  it('keeps stat values inside the 0-100 range', () => {
    assert.equal(clampStat(-12), 0)
    assert.equal(clampStat(42), 42)
    assert.equal(clampStat(130), 100)
  })

  it('derives mood from the most important low stat', () => {
    assert.equal(getMoodFromStats({ ...baseStats, health: 25 }), 'sick')
    assert.equal(getMoodFromStats({ ...baseStats, energy: 40 }), 'sleepy')
    assert.equal(getMoodFromStats({ ...baseStats, food: 40 }), 'hungry')
    assert.equal(getMoodFromStats(baseStats), 'happy')
  })

  it('detects dead-end stats at zero or below', () => {
    assert.equal(hasAnyZeroStat(baseStats), false)
    assert.equal(hasAnyZeroStat({ ...baseStats, food: 0 }), true)
    assert.equal(hasAnyZeroStat({ ...baseStats, energy: -1 }), true)
  })
})

describe('room actions', () => {
  it('defines action costs for every playable room', () => {
    assert.deepEqual(Object.keys(ROOM_ACTION_COSTS).sort(), [
      'casino',
      'kitchen',
      'park',
      'store',
    ])
  })

  it('applies the kitchen action and clamps improved stats', () => {
    const result = executeRoomAction(
      'kitchen',
      { ...baseStats, food: 90, energy: 98 },
      24,
    )

    assert.equal(result.coins, 16)
    assert.deepEqual(result.stats, {
      food: 100,
      health: 88,
      happiness: 82,
      energy: 100,
    })
  })

  it('handles deterministic casino jackpot and loss rolls', () => {
    const jackpot = executeRoomAction('casino', baseStats, 24, 0.9)
    const loss = executeRoomAction('casino', baseStats, 15, 0.1)

    assert.equal(jackpot.coins, 44)
    assert.equal(jackpot.stats.happiness, 100)
    assert.equal(loss.coins, 0)
  })
})
