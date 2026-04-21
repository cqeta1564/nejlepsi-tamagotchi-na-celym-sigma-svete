import type { Pet } from '../types'
import PetOptionCard from './PetOptionCard'

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
  if (pets.length === 0) {
    return (
      <div className="empty-state" role="status">
        Momentalne nejsou dostupni zadni mazlicci. Zkontroluj zdrojova data a zkus to znovu.
      </div>
    )
  }

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
