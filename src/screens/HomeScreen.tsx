import PetCard from '../components/PetCard'
import StatsPanel from '../components/StatsPanel'
import type { Pet } from '../types'

type HomeScreenProps = {
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
  onRestartRequest: () => void
  isPetDead: boolean
  isActionDisabled: boolean
}

function HomeScreen({
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
  onRestartRequest,
  isPetDead,
  isActionDisabled,
}: HomeScreenProps) {
  return (
    <div className="wire-screen wire-screen--game">
      <div className="top-bar">
        <div className="top-bar__spacer" />
        <button
          type="button"
          className="wire-button wire-button--small wire-button--primary"
          onClick={onRestartRequest}
        >
          nova hra
        </button>
      </div>

      <StatsPanel stats={pet.stats} />

      <PetCard
        pet={pet}
        roomId={roomId}
        roomName={roomName}
        roomImageLabel={roomImageLabel}
        roomDescription={roomDescription}
        roomBackgroundImage={roomBackgroundImage}
        actionIcon={actionIcon}
        actionLabel={actionLabel}
        actionCost={actionCost}
        coins={coins}
        statusText={statusText}
        onPrevRoom={onPrevRoom}
        onNextRoom={onNextRoom}
        onRoomAction={onRoomAction}
        isActionDisabled={isActionDisabled}
        isPetDead={isPetDead}
      />
    </div>
  )
}

export default HomeScreen
