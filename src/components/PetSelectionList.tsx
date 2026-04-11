import PetOptionCard from './PetOptionCard'
import type { Pet } from '../types'

type PetSelectionListProps = {
  pets: Pet[]
  selectedPetId: string | null
  onSelect: (petId: string) => void
}

function PetSelectionList({
  pets,
  selectedPetId,
  onSelect,
}: PetSelectionListProps) {
  return (
    <div className="pet-selection-list">
      {pets.map((pet) => (
        <PetOptionCard
          key={pet.id}
          pet={pet}
          isSelected={pet.id === selectedPetId}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

export default PetSelectionList
