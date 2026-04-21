import RoomStage from '../components/RoomStage'
import StatsPanel from '../components/StatsPanel'
import type { Pet, PetAction, Room } from '../types'

type HomeScreenProps = {
  pet: Pet
  room: Room
  roomAction: PetAction
  isRoomActionAvailable?: boolean
  canChangeRoom?: boolean
  onActionClick: (actionId: PetAction['id']) => void
  onPreviousRoom: () => void
  onNextRoom: () => void
  onChangePet: () => void
  onResetGame: () => void
}

function HomeScreen({
  pet,
  room,
  roomAction,
  isRoomActionAvailable = true,
  canChangeRoom = true,
  onActionClick,
  onPreviousRoom,
  onNextRoom,
  onChangePet,
  onResetGame,
}: HomeScreenProps) {
  return (
    <section className="screen screen--home">
      <div className="home-screen__topbar">
        <div>
          <p className="screen-header__eyebrow">Webove tamagotchi</p>
          <h2 className="screen-header__title">{pet.name}</h2>
        </div>
        <button
          type="button"
          className="secondary-button secondary-button--danger"
          onClick={onResetGame}
        >
          Nova hra
        </button>
      </div>

      <StatsPanel stats={pet.stats} />

      <RoomStage
        pet={pet}
        room={room}
        action={roomAction}
        isActionAvailable={isRoomActionAvailable}
        canChangeRoom={canChangeRoom}
        onActionClick={onActionClick}
        onPreviousRoom={onPreviousRoom}
        onNextRoom={onNextRoom}
      />

      <div className="home-screen__toolbar">
        <button type="button" className="secondary-button" onClick={onChangePet}>
          Zmenit mazlicka
        </button>
        <p className="home-screen__hint">
          {isRoomActionAvailable
            ? `${pet.species} je s tebou v mistnosti ${room.name}.`
            : `${room.name} je nactena ve fallback rezimu, proto je akce docasne vypnuta.`}
        </p>
      </div>
    </section>
  )
}

export default HomeScreen
