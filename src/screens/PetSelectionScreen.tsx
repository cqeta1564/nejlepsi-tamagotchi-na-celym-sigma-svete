import type { Pet } from '../types'

type PetSelectionScreenProps = {
  pets: Pet[]
  selectedPetId: string | null
  onSelectPet: (petId: string) => void
  onConfirmSelection: () => void
}

function PetSelectionScreen(_: PetSelectionScreenProps) {
<<<<<<< Updated upstream
=======
  void _
>>>>>>> Stashed changes
  return null
}

export default PetSelectionScreen
