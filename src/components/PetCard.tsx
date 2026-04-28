import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import coinIcon from '../assets/item-coins.webp'
import CutoutImage from './CutoutImage'
import PetAvatar from './PetAvatar'
import PetFace from './PetFace'
import type { Pet } from '../types'

const ROOM_TRANSITION_DURATION_MS = 420
const ACTION_FEEDBACK_DURATION_MS = 760

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
  actionIconWidth?: number
  actionIconHeight?: number
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
  actionIconWidth = 512,
  actionIconHeight = 512,
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
  const [isActionFeedbackActive, setIsActionFeedbackActive] = useState(false)
  const previousRoomIndexRef = useRef(roomIndex)
  const displayedBackgroundImageRef = useRef(roomBackgroundImage)
  const animationFrameRef = useRef<number | null>(null)
  const animationTimeoutRef = useRef<number | null>(null)
  const actionFeedbackTimeoutRef = useRef<number | null>(null)

  useLayoutEffect(() => {
    const previousRoomIndex = previousRoomIndexRef.current

    if (previousRoomIndex === roomIndex) {
      if (displayedBackgroundImageRef.current !== roomBackgroundImage) {
        if (animationFrameRef.current !== null) {
          window.cancelAnimationFrame(animationFrameRef.current)
          animationFrameRef.current = null
        }

        if (animationTimeoutRef.current !== null) {
          window.clearTimeout(animationTimeoutRef.current)
          animationTimeoutRef.current = null
        }

        displayedBackgroundImageRef.current = roomBackgroundImage
        animationFrameRef.current = window.requestAnimationFrame(() => {
          animationFrameRef.current = null
          setDisplayedBackgroundImage(roomBackgroundImage)
        })
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

    const nextSlideDirection = getRoomSlideDirection(previousRoomIndex, roomIndex, roomCount)
    const outgoingImage = displayedBackgroundImageRef.current

    displayedBackgroundImageRef.current = roomBackgroundImage
    previousRoomIndexRef.current = roomIndex

    animationFrameRef.current = window.requestAnimationFrame(() => {
      setSlideDirection(nextSlideDirection)
      setOutgoingBackgroundImage(outgoingImage)
      setDisplayedBackgroundImage(roomBackgroundImage)
      setIsBackgroundAnimating(false)

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
    })
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

      if (actionFeedbackTimeoutRef.current !== null) {
        window.clearTimeout(actionFeedbackTimeoutRef.current)
        actionFeedbackTimeoutRef.current = null
      }
    }
  }, [])

  function handleActionClick() {
    onRoomAction()
    setIsActionFeedbackActive(false)

    if (actionFeedbackTimeoutRef.current !== null) {
      window.clearTimeout(actionFeedbackTimeoutRef.current)
    }

    window.requestAnimationFrame(() => {
      setIsActionFeedbackActive(true)
    })

    actionFeedbackTimeoutRef.current = window.setTimeout(() => {
      setIsActionFeedbackActive(false)
      actionFeedbackTimeoutRef.current = null
    }, ACTION_FEEDBACK_DURATION_MS)
  }

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
        <CutoutImage src={coinIcon} alt="" className="money-dot" width={256} height={256} />
        <span>penize {coins}</span>
      </div>

      <p className="room-card__title">{roomName}</p>

      <div className="room-card__scene">
        <div
          className={[
            'room-card__pet',
            `room-card__pet--${pet.id}`,
            isActionFeedbackActive ? 'room-card__pet--feedback' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
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
          className="wire-button wire-button--action"
          onClick={handleActionClick}
          disabled={isActionDisabled}
          aria-label={`${actionLabel} za ${actionCost} penez`}
          title={`${actionLabel} za ${actionCost} penez`}
        >
          <CutoutImage
            src={actionIcon}
            alt=""
            className="wire-button__icon"
            width={actionIconWidth}
            height={actionIconHeight}
          />
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
