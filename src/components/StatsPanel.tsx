import StatBar from './StatBar'
import type { PetStats } from '../types'

type StatsPanelProps = {
  stats: PetStats
}

function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <section className="panel">
      <div className="panel__heading">
        <p className="panel__eyebrow">Statistiky</p>
        <h3>Aktualni potreby mazlicka</h3>
      </div>

      <div className="stats-stack">
        <StatBar label="Hlad" statKey="food" value={stats.food} />
        <StatBar label="Zdravi" statKey="health" value={stats.health} />
        <StatBar label="Stesti" statKey="happiness" value={stats.happiness} />
        <StatBar label="Energie" statKey="energy" value={stats.energy} />
      </div>
    </section>
  )
}

export default StatsPanel
