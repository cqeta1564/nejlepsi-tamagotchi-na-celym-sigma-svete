import type { Pet } from '../types'

type PetSelectionListProps = {
  pets: Pet[]
  selectedPetId: string | null
  onSelect: (petId: string) => void
}

function PetSelectionList(_: PetSelectionListProps) {
  return null
}

export default PetSelectionList
