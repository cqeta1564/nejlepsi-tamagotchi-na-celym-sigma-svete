import PetAvatar from './PetAvatar'
import type { Pet } from '../types'

type PetOptionCardProps = {
  pet: Pet
  isSelected: boolean
  onSelect: (petId: string) => void
}

function PetOptionCard({ pet, isSelected, onSelect }: PetOptionCardProps) {
  return (
    <button
      type="button"
      className={`pet-option-card${isSelected ? ' pet-option-card--selected' : ''}`}
      onClick={() => onSelect(pet.id)}
    >
      <span className="pet-option-card__check" aria-hidden="true">
        {isSelected ? 'OK' : ''}
      </span>

      <PetAvatar src={pet.image} alt={pet.species} />

      <span className="pet-option-card__content">
        <strong>{pet.name}</strong>
        <span className="pet-option-card__species">{pet.species}</span>
        <span className="pet-option-card__description">{pet.description}</span>
      </span>
    </button>
  )
}

export default PetOptionCard
