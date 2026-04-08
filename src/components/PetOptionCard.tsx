import type { Pet } from '../types'
import PetAvatar from './PetAvatar'

type PetOptionCardProps = {
  pet: Pet
  isSelected: boolean
  onSelect: (petId: string) => void
}

const MOOD_COPY = {
  happy: 'dobry start',
  hungry: 'ma hlad',
  sleepy: 'chce odpocinout',
  sick: 'potrebuje peci',
} as const

function PetOptionCard({
  pet,
  isSelected,
  onSelect,
}: PetOptionCardProps) {
  return (
    <button
      type="button"
      className={`pet-option${isSelected ? ' pet-option--selected' : ''}`}
      onClick={() => onSelect(pet.id)}
      aria-pressed={isSelected}
    >
      <PetAvatar src={pet.image} alt={pet.species} />

      <span className="pet-option__content">
        <span className="pet-option__header">
          <span className="pet-option__name">{pet.name}</span>
          <span className="pet-option__species">{pet.species}</span>
        </span>

        <span className="pet-option__description">{pet.description}</span>

        <span className="pet-option__summary">
          <span>{MOOD_COPY[pet.mood]}</span>
          <span>HP {pet.stats.health}%</span>
        </span>
      </span>
    </button>
  )
}

export default PetOptionCard
