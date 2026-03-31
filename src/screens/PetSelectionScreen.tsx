import type { Pet } from '../types'

type PetSelectionScreenProps = {
  pets: Pet[]
  selectedPetId: string | null
  onSelectPet: (petId: string) => void
  onConfirmSelection: () => void
}

function PetSelectionScreen(_: PetSelectionScreenProps) {
  return null
}

export default PetSelectionScreen
