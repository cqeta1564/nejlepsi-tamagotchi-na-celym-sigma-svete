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
  const selectedPet = pets.find((pet) => pet.id === selectedPetId)

  return (
    <section className="screen">
      <ScreenHeader
        title="Vyber si mazlicka"
        subtitle="Kazdy pet ma vlastni startovni statistiky. Vyber ulozime automaticky."
      />

      <PetSelectionList
        pets={pets}
        selectedPetId={selectedPetId}
        onSelect={onSelectPet}
      />

      <div className="screen__actions">
        <SelectPetButton
          disabled={selectedPetId === null}
          onClick={onConfirmSelection}
        />
        <p className="screen__hint">
          {selectedPet
            ? `${selectedPet.name} je pripraveny na start.`
            : 'Nejdriv vyber jednoho mazlicka.'}
        </p>
      </div>
    </section>
  )
}

export default PetSelectionScreen
