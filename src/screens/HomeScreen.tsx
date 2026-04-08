import ActionsPanel from '../components/ActionsPanel'
import PetCard from '../components/PetCard'
import ScreenHeader from '../components/ScreenHeader'
import StatsPanel from '../components/StatsPanel'
import type { Pet, PetAction } from '../types'

type HomeScreenProps = {
  pet: Pet
  actions: PetAction[]
  onActionClick: (actionId: PetAction['id']) => void
  onChangePet: () => void
  onResetGame: () => void
}

const MOOD_COPY = {
  happy: 've forme a pripraveny na dalsi dobrodruzstvi.',
  hungry: 'hladovy a potrebuje nakrmit.',
  sleepy: 'ospaly a chce si dat pauzu.',
  sick: 'slaby a potrebuje peci.',
} as const

function HomeScreen({
  pet,
  actions,
  onActionClick,
  onChangePet,
  onResetGame,
}: HomeScreenProps) {
  return (
    <section className="screen">
      <ScreenHeader
        title={`Ahoj, ${pet.name}`}
        subtitle={`${pet.species} je ted ${MOOD_COPY[pet.mood]} ${pet.statusMessage}`}
      />

      <PetCard pet={pet} />
      <StatsPanel stats={pet.stats} />
      <ActionsPanel
        actions={actions}
        disabled={!pet.alive}
        onActionClick={onActionClick}
      />

      <div className="home-screen__toolbar">
        <button type="button" className="secondary-button" onClick={onChangePet}>
          Zmenit mazlicka
        </button>
        <button
          type="button"
          className="secondary-button secondary-button--danger"
          onClick={onResetGame}
        >
          Nova hra
        </button>
      </div>
    </section>
  )
}

export default HomeScreen
