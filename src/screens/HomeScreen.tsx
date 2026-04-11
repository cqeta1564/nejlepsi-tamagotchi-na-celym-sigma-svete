import ActionsPanel from '../components/ActionsPanel'
import PetCard from '../components/PetCard'
import ScreenHeader from '../components/ScreenHeader'
import StatsPanel from '../components/StatsPanel'
import type { Pet, PetAction } from '../types'

type HomeScreenProps = {
  pet: Pet
  actions: PetAction[]
  onActionClick: (actionId: PetAction['id']) => void
}

function HomeScreen({ pet, actions, onActionClick }: HomeScreenProps) {
  return (
    <section className="screen screen--home">
      <ScreenHeader
        title={`${pet.name} je pripraven na dalsi den`}
        subtitle={`Sleduj potreby mazlicka ${pet.species.toLowerCase()}, reaguj na zmeny nalady a udrz statistiky v bezpecnych hodnotach.`}
      />

      <div className="screen-grid">
        <div className="screen-grid__primary">
          <PetCard pet={pet} />
          <ActionsPanel actions={actions} onActionClick={onActionClick} />
        </div>

        <aside className="screen-grid__secondary">
          <StatsPanel stats={pet.stats} />
        </aside>
      </div>
    </section>
  )
}

export default HomeScreen
