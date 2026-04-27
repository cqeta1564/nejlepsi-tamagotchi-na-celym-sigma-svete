import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import coinIcon from '../assets/item-coins.png'
import CutoutImage from './CutoutImage'
import PetAvatar from './PetAvatar'
import PetFace from './PetFace'
import type { Pet } from '../types'

const ROOM_TRANSITION_DURATION_MS = 420

type SlideDirection = 'next' | 'prev'

type PetCardProps = {
  pet: Pet
  roomId: 'kitchen' | 'store' | 'park' | 'casino'
  roomIndex: number
  roomCount: number
  roomName: string
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
}

function PetCard({
  pet,
  roomId,
  roomIndex,
  roomCount,
  roomName,
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
}: PetCardProps) {
  const showSleepBubble = pet.mood === 'sleepy' || pet.stats.energy <= 35
  const [displayedBackgroundImage, setDisplayedBackgroundImage] = useState(roomBackgroundImage)
  const [outgoingBackgroundImage, setOutgoingBackgroundImage] = useState<string | null>(null)
  const [slideDirection, setSlideDirection] = useState<SlideDirection>('next')
  const [isBackgroundAnimating, setIsBackgroundAnimating] = useState(false)
  const previousRoomIndexRef = useRef(roomIndex)
  const displayedBackgroundImageRef = useRef(roomBackgroundImage)
  const animationFrameRef = useRef<number | null>(null)
  const animationTimeoutRef = useRef<number | null>(null)

  useLayoutEffect(() => {
    const previousRoomIndex = previousRoomIndexRef.current

    if (previousRoomIndex === roomIndex) {
      if (displayedBackgroundImageRef.current !== roomBackgroundImage) {
        displayedBackgroundImageRef.current = roomBackgroundImage
        setDisplayedBackgroundImage(roomBackgroundImage)
      }

      return
    }

    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    if (animationTimeoutRef.current !== null) {
      window.clearTimeout(animationTimeoutRef.current)
      animationTimeoutRef.current = null
    }

    setSlideDirection(getRoomSlideDirection(previousRoomIndex, roomIndex, roomCount))
    setOutgoingBackgroundImage(displayedBackgroundImageRef.current)
    displayedBackgroundImageRef.current = roomBackgroundImage
    setDisplayedBackgroundImage(roomBackgroundImage)
    setIsBackgroundAnimating(false)
    previousRoomIndexRef.current = roomIndex

    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = window.requestAnimationFrame(() => {
        animationFrameRef.current = null
        setIsBackgroundAnimating(true)
      })
    })

    animationTimeoutRef.current = window.setTimeout(() => {
      setOutgoingBackgroundImage(null)
      setIsBackgroundAnimating(false)
      animationTimeoutRef.current = null
    }, ROOM_TRANSITION_DURATION_MS)
  }, [roomBackgroundImage, roomCount, roomIndex])

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }

      if (animationTimeoutRef.current !== null) {
        window.clearTimeout(animationTimeoutRef.current)
        animationTimeoutRef.current = null
      }
    }
  }, [])

  const backgroundSlides = outgoingBackgroundImage
    ? slideDirection === 'next'
      ? [outgoingBackgroundImage, displayedBackgroundImage]
      : [displayedBackgroundImage, outgoingBackgroundImage]
    : [displayedBackgroundImage]

  return (
    <section
      className={`room-card room-card--${roomId}`}
      style={{ '--room-slide-duration': `${ROOM_TRANSITION_DURATION_MS}ms` } as CSSProperties}
    >
      <div
        className={[
          'room-card__backgrounds',
          outgoingBackgroundImage ? 'room-card__backgrounds--transitioning' : '',
          `room-card__backgrounds--${slideDirection}`,
          isBackgroundAnimating ? 'room-card__backgrounds--animating' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden="true"
      >
        <div className="room-card__background-track">
          {backgroundSlides.map((backgroundImage, index) => (
            <div
              key={`${backgroundImage}-${index}`}
              className="room-card__background-slide"
              style={{ backgroundImage: `url(${backgroundImage})` } as CSSProperties}
            />
          ))}
        </div>
      </div>

      <div className="room-card__money">
        <CutoutImage src={coinIcon} alt="" className="money-dot" />
        <span>penize {coins}</span>
      </div>

      <p className="room-card__title">{roomName}</p>

      <div className="room-card__scene">
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
          <CutoutImage src={actionIcon} alt="" className="wire-button__icon" />
          {actionLabel}
          <span className="wire-button__subtext">{actionCost} penez</span>
        </button>

        <button type="button" className="arrow-button" onClick={onNextRoom}>
          &rarr;
        </button>
      </div>
    </section>
  )
}

export default PetCard

function getRoomSlideDirection(
  previousRoomIndex: number,
  currentRoomIndex: number,
  roomCount: number,
): SlideDirection {
  if (roomCount <= 1) {
    return 'next'
  }

  if ((previousRoomIndex + 1) % roomCount === currentRoomIndex) {
    return 'next'
  }

  if ((previousRoomIndex - 1 + roomCount) % roomCount === currentRoomIndex) {
    return 'prev'
  }

  return currentRoomIndex > previousRoomIndex ? 'next' : 'prev'
}
