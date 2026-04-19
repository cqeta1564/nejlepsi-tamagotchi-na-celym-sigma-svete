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
      className={`pet-choice${isSelected ? ' pet-choice--selected' : ''}`}
      onClick={() => onSelect(pet.id)}
      aria-pressed={isSelected}
    >
      <PetAvatar src={pet.image} alt={pet.name} />
      <span className="pet-choice__name">{pet.name}</span>
    </button>
  )
}

export default PetOptionCard
