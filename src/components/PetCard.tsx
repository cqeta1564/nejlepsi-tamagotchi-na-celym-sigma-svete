import type { CSSProperties } from 'react'
import PetAvatar from './PetAvatar'
import PetFace from './PetFace'
import type { Pet } from '../types'

type PetCardProps = {
  pet: Pet
  roomId: 'kitchen' | 'store' | 'park' | 'casino'
  roomName: string
  roomImageLabel: string
  roomDescription: string
  roomBackgroundImage: string
  actionIcon: string
  actionLabel: string
  actionCost: number
  coins: number
  statusText: string
  onPrevRoom: () => void
  onNextRoom: () => void
  onRoomAction: () => void
  isActionDisabled: boolean
  isPetDead: boolean
}

function PetCard({
  pet,
  roomId,
  roomName,
  roomImageLabel,
  roomDescription,
  roomBackgroundImage,
  actionIcon,
  actionLabel,
  actionCost,
  coins,
  statusText,
  onPrevRoom,
  onNextRoom,
  onRoomAction,
  isActionDisabled,
  isPetDead,
}: PetCardProps) {
  const showSleepBubble = pet.mood === 'sleepy' || pet.stats.energy <= 35

  return (
    <section
      className={`room-card room-card--${roomId}`}
      style={{ backgroundImage: `url(${roomBackgroundImage})` } as CSSProperties}
    >
      <div className="room-card__money">
        <span className="money-dot" aria-hidden="true" />
        <span>penize {coins}</span>
      </div>

      <p className="room-card__title">{roomName}</p>

      <div className="room-card__scene">
        <div className="room-card__image-placeholder">
          <img src={actionIcon} alt="" className="room-card__image-placeholder-icon" aria-hidden="true" />
          <span>{roomImageLabel}</span>
        </div>
        <div className={`room-card__pet room-card__pet--${pet.id}`}>
          {showSleepBubble ? <span className="room-card__sleep-bubble">zzz</span> : null}
          <PetAvatar src={pet.image} alt={pet.name}>
            <PetFace petId={pet.id} stats={pet.stats} />
          </PetAvatar>
        </div>
      </div>

      <div className="room-card__meta">
        <p className="room-card__description">{roomDescription}</p>
        <p className="room-card__status">{statusText}</p>
      </div>

      <div className="room-card__controls">
        <button type="button" className="arrow-button" onClick={onPrevRoom}>
          &larr;
        </button>

        <button
          type="button"
          className="wire-button wire-button--action wire-button--primary"
          onClick={onRoomAction}
          disabled={isActionDisabled}
        >
          <img src={actionIcon} alt="" className="wire-button__icon" aria-hidden="true" />
          {actionLabel}
          <span className="wire-button__subtext">{actionCost} penez</span>
        </button>

        <button type="button" className="arrow-button" onClick={onNextRoom}>
          &rarr;
        </button>
      </div>

      <p className="room-card__hint">
        {isPetDead
          ? 'Mazlicek uz nemuze pokracovat. Zaloz novou hru.'
          : coins < actionCost
            ? 'Na tuhle aktivitu ted nemas dost penez.'
            : `Aktualni nalada: ${pet.mood}`}
      </p>
    </section>
  )
}

export default PetCard
