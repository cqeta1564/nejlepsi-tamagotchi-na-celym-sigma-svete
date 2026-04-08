import type { Pet, PetAction, Room } from '../types'
import PetAvatar from './PetAvatar'

type RoomStageProps = {
  pet: Pet
  room: Room
  action: PetAction
  onActionClick: (actionId: PetAction['id']) => void
  onPreviousRoom: () => void
  onNextRoom: () => void
}

function RoomStage({
  pet,
  room,
  action,
  onActionClick,
  onPreviousRoom,
  onNextRoom,
}: RoomStageProps) {
  return (
    <section className="room-stage" aria-label={`Mistnost ${room.name}`}>
      <div className="room-stage__meta">
        <span className="room-stage__pill">Mistnost</span>
        <span className="room-stage__pill room-stage__pill--mood">{pet.status}</span>
      </div>

      <div className="room-stage__card">
        <p className="room-stage__label">{room.name}</p>
        <p className="room-stage__description">{room.description}</p>

        <div className="room-stage__pet">
          <PetAvatar src={pet.image} alt={pet.species} />
          <strong>{pet.name}</strong>
        </div>

        <p className="room-stage__status">{pet.statusMessage}</p>
      </div>

      <div className="room-stage__controls">
        <button
          type="button"
          className="room-stage__arrow"
          onClick={onPreviousRoom}
          aria-label="Predchozi mistnost"
        >
          ←
        </button>
        <button
          type="button"
          className="primary-button room-stage__action"
          onClick={() => onActionClick(action.id)}
          disabled={!pet.alive}
        >
          {action.label}
        </button>
        <button
          type="button"
          className="room-stage__arrow"
          onClick={onNextRoom}
          aria-label="Dalsi mistnost"
        >
          →
        </button>
      </div>
    </section>
  )
}

export default RoomStage
