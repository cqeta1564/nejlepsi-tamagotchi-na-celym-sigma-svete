import type { CSSProperties } from 'react'
import type { PetStats } from '../types'

type StatsPanelProps = {
  stats: PetStats
}

function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="stats-row">
      <StatChip label="hlad" value={stats.food} tone="food" />
      <StatChip label="zdravi" value={stats.health} tone="health" />
      <StatChip label="energie" value={stats.energy} tone="energy" />
      <StatChip label="stesti" value={stats.happiness} tone="happiness" />
    </div>
  )
}

type StatChipProps = {
  label: string
  value: number
  tone: 'food' | 'health' | 'energy' | 'happiness'
}

function StatChip({ label, value, tone }: StatChipProps) {
  const fillHeight = `${Math.max(0, Math.min(100, value))}%`

  return (
    <div
      className={`stat-chip stat-chip--${tone}`}
      style={{ '--stat-fill-height': fillHeight } as CSSProperties}
    >
      <div className="stat-chip__fill" aria-hidden="true" />
      <span className="stat-chip__label">{label}</span>
      <strong className="stat-chip__value">{value}</strong>
    </div>
  )
}

export default StatsPanel
