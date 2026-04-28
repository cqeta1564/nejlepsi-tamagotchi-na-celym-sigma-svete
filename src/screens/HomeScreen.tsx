import PetCard from '../components/PetCard'
import StatsPanel from '../components/StatsPanel'
import type { Pet } from '../types'

type HomeScreenProps = {
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

function HomeScreen({
  pet,
  roomId,
  roomIndex,
  roomCount,
  roomName,
  roomDescription,
  roomBackgroundImage,
  actionIcon,
  actionIconWidth,
  actionIconHeight,
  actionLabel,
  actionCost,
  coins,
  statusText,
  onPrevRoom,
  onNextRoom,
  onRoomAction,
  isActionDisabled,
}: HomeScreenProps) {
  return (
    <div className="wire-screen wire-screen--game">
      <div className="home-layout">
        <div className="home-layout__stats">
          <StatsPanel stats={pet.stats} />
        </div>

        <div className="home-layout__stage">
          <PetCard
            pet={pet}
            roomId={roomId}
            roomIndex={roomIndex}
            roomCount={roomCount}
            roomName={roomName}
            roomDescription={roomDescription}
            roomBackgroundImage={roomBackgroundImage}
            actionIcon={actionIcon}
            actionIconWidth={actionIconWidth}
            actionIconHeight={actionIconHeight}
            actionLabel={actionLabel}
            actionCost={actionCost}
            coins={coins}
            statusText={statusText}
            onPrevRoom={onPrevRoom}
            onNextRoom={onNextRoom}
            onRoomAction={onRoomAction}
            isActionDisabled={isActionDisabled}
          />
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
