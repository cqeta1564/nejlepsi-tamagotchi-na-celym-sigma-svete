import type { PetStats } from '../types'
import StatBar from './StatBar'

type StatsPanelProps = {
  stats: PetStats
}

const STAT_LABELS = {
  food: 'Hlad',
  health: 'Zdravi',
  happiness: 'Stesti',
  energy: 'Energie',
} as const

function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <section className="stats-panel" aria-label="Staty mazlicka">
      <StatBar label={STAT_LABELS.food} statKey="food" value={stats.food} />
      <StatBar
        label={STAT_LABELS.health}
        statKey="health"
        value={stats.health}
      />
      <StatBar
        label={STAT_LABELS.happiness}
        statKey="happiness"
        value={stats.happiness}
      />
      <StatBar
        label={STAT_LABELS.energy}
        statKey="energy"
        value={stats.energy}
      />
    </section>
  )
}

export default StatsPanel
