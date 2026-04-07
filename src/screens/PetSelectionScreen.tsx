import type { Pet } from '../types'

type PetSelectionScreenProps = {
  pets: Pet[]
  selectedPetId: string | null
  onSelectPet: (petId: string) => void
  onConfirmSelection: () => void
}

function PetSelectionScreen(props: PetSelectionScreenProps) {
  void props
  return null
}

export default PetSelectionScreen
