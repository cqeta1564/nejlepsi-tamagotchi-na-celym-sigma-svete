import type { PetStatKey } from '../types'

type StatBarProps = {
  label: string
  statKey: PetStatKey
  value: number
}

function StatBar({ label, statKey, value }: StatBarProps) {
  return (
    <div
      className={`stat-bar stat-bar--${statKey}`}
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      data-low={value <= 24}
    >
      <div className="stat-bar__meta">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>

      <div className="stat-bar__track" aria-hidden="true">
        <div className="stat-bar__fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export default StatBar
