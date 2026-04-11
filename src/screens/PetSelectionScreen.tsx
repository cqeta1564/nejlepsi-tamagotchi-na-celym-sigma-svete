import PetSelectionList from '../components/PetSelectionList'
import ScreenHeader from '../components/ScreenHeader'
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
    <section className="screen screen--selection">
      <ScreenHeader
        title="Vyber si mazlicka pro novou hru"
        subtitle="Kazdy mazlicek ma jinou naladu i vychozi statistiky. Zacni s tim, ktery ti sedi nejvic."
      />

      <PetSelectionList
        pets={pets}
        selectedPetId={selectedPetId}
        onSelect={onSelectPet}
      />

      <div className="selection-actions">
        <SelectPetButton
          disabled={!selectedPetId}
          onClick={onConfirmSelection}
        />
      </div>
    </section>
  )
}

export default PetSelectionScreen
