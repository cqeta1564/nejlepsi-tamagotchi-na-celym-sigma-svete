import type { CSSProperties } from 'react'
import type { PetStatKey } from '../types'

type StatBarProps = {
  label: string
  statKey: PetStatKey
  value: number
}

const statColorMap: Record<PetStatKey, string> = {
  food: 'var(--color-stat-hunger)',
  health: 'var(--color-stat-health)',
  happiness: 'var(--color-stat-happiness)',
  energy: 'var(--color-stat-energy)',
}

function StatBar({ label, statKey, value }: StatBarProps) {
  const style = {
    '--stat-color': statColorMap[statKey],
    '--stat-width': `${value}%`,
  } as CSSProperties

  return (
    <div className="stat-bar" style={style}>
      <div className="stat-bar__header">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>

      <div className="stat-bar__track" aria-hidden="true">
        <div className="stat-bar__fill" />
      </div>
    </div>
  )
}

export default StatBar
