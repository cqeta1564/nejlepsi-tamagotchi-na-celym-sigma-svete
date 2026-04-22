import PetSelectionList from '../components/PetSelectionList'
import SelectPetButton from '../components/SelectPetButton'
import type { Pet } from '../types'

type PetSelectionScreenProps = {
  pets: Pet[]
  selectedPetId: string | null
  onSelectPet: (petId: string) => void
  onConfirmSelection: () => void
}

function PetSelectionScreen({
  pets,
  selectedPetId,
  onSelectPet,
  onConfirmSelection,
}: PetSelectionScreenProps) {
  return (
    <div className="wire-screen wire-screen--selection">
      <p className="wire-title">Webove tamagotchi</p>
      <h1>1. Vyber si sveho mazlicka</h1>

      <PetSelectionList
        pets={pets}
        selectedPetId={selectedPetId}
        onSelect={onSelectPet}
      />

      <SelectPetButton
        disabled={!selectedPetId}
        onClick={onConfirmSelection}
      />
    </div>
  )
}

export default PetSelectionScreen
