import { useEffect, useMemo, useRef, useState } from 'react'
import HomeScreen from './screens/HomeScreen'
import PetSelectionScreen from './screens/PetSelectionScreen'
import StatusModal from './components/StatusModal'
import itemAutomatImage from './assets/item-automat.png'
import itemKafeCigoImage from './assets/item-kafe-cigo.png'
import itemMonsterImage from './assets/item-monster.png'
import itemParkDangerImage from './assets/item-park-danger.png'
import roomCasinoImage from './assets/room-casino.png'
import roomKitchenImage from './assets/room-kitchen.png'
import roomParkImage from './assets/room-park.png'
import roomStoreImage from './assets/room-store.png'
import { mockPets } from './data/pets'
import {
  ROOM_ACTION_COSTS,
  clampStat,
  executeRoomAction,
  getMoodFromStats,
  hasAnyZeroStat,
  type RoomId,
} from './game/roomActions'
import type { GameState } from './types'

const STORAGE_KEY = 'tamagotchi-wireframe-state'
const THEME_STORAGE_KEY = 'tamagotchi-theme'
const STAT_DECAY_INTERVAL_MS = 12000
const COIN_REGEN_INTERVAL_MS = 5000

type Room = {
  id: RoomId
  name: string
  actionLabel: string
  actionCost: number
  imageLabel: string
  description: string
  backgroundImage: string
  actionIcon: string
}

const rooms: Room[] = [
  {
    id: 'kitchen',
    name: 'Kuchyn',
    actionLabel: 'Kafe s cigem',
    actionCost: ROOM_ACTION_COSTS.kitchen,
    imageLabel: 'Kuchyn',
    description: 'Doplni hlad a trosku probere energii.',
    backgroundImage: roomKitchenImage,
    actionIcon: itemKafeCigoImage,
  },
  {
    id: 'store',
    name: 'Vecerka',
    actionLabel: 'Bily monster',
    actionCost: ROOM_ACTION_COSTS.store,
    imageLabel: 'Vecerka',
    description: 'Doplni energii, ale nestoji malo.',
    backgroundImage: roomStoreImage,
    actionIcon: itemMonsterImage,
  },
  {
    id: 'park',
    name: 'Park na hlavnim nadrazi',
    actionLabel: 'Dat si piko',
    actionCost: ROOM_ACTION_COSTS.park,
    imageLabel: 'Park',
    description: 'Zvedne zdravi a trochu naladu.',
    backgroundImage: roomParkImage,
    actionIcon: itemParkDangerImage,
  },
  {
    id: 'casino',
    name: 'Kasino',
    actionLabel: 'Zatocit automatem',
    actionCost: ROOM_ACTION_COSTS.casino,
    imageLabel: 'Kasino',
    description: 'Doplni stesti a muzes vyhrat nebo prohrat penize.',
    backgroundImage: roomCasinoImage,
    actionIcon: itemAutomatImage,
  },
]

const initialGameState: GameState = {
  currentScreen: 'selection',
  selectedPetId: null,
  pets: mockPets,
}

type PersistedState = {
  gameState: GameState
  roomIndex: number
  coins: number
  statusText: string
}

type ModalState =
  | {
      isOpen: false
      kind: 'restart'
      title: string
      message: string
    }
  | {
      isOpen: true
      kind: 'restart' | 'dead'
      title: string
      message: string
    }

function App() {
  const [gameState, setGameState] = useState<GameState>(initialGameState)
  const [roomIndex, setRoomIndex] = useState(0)
  const [coins, setCoins] = useState(24)
  const [statusText, setStatusText] = useState('Vyber mistnost a proved cinnost.')
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => getInitialThemeMode())
  const [usesSystemTheme, setUsesSystemTheme] = useState(() => !getStoredThemeMode())
  const [isHydrating, setIsHydrating] = useState(true)
  const [storageError, setStorageError] = useState(false)
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    kind: 'restart',
    title: '',
    message: '',
  })
  const hasDeathModalOpenRef = useRef(false)

  const selectedPet = useMemo(
    () => gameState.pets.find((pet) => pet.id === gameState.selectedPetId) ?? null,
    [gameState.pets, gameState.selectedPetId],
  )

  const currentRoom = rooms[roomIndex]
  const isPetDead = selectedPet ? hasAnyZeroStat(selectedPet.stats) : false
  const cannotAffordAction = coins < currentRoom.actionCost
  const isHomeScreen = gameState.currentScreen === 'home' && Boolean(selectedPet)
  const themeToggleLabel = themeMode === 'dark' ? 'svetly motiv' : 'tmavy motiv'

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode
    document.documentElement.style.colorScheme = themeMode
  }, [themeMode])

  useEffect(() => {
    if (!usesSystemTheme) {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleThemeChange = (event: MediaQueryListEvent) => {
      setThemeMode(event.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleThemeChange)

    return () => mediaQuery.removeEventListener('change', handleThemeChange)
  }, [usesSystemTheme])

  useEffect(() => {
    try {
      const rawValue = window.localStorage.getItem(STORAGE_KEY)

      if (!rawValue) {
        return
      }

      const parsedValue = JSON.parse(rawValue) as Partial<PersistedState>

      if (!isPersistedState(parsedValue)) {
        throw new Error('Invalid stored state')
      }

      setGameState(parsedValue.gameState)
      setRoomIndex(parsedValue.roomIndex)
      setCoins(parsedValue.coins)
      setStatusText(parsedValue.statusText)
    } catch (error) {
      console.error(error)
      setStorageError(true)
    } finally {
      setIsHydrating(false)
    }
  }, [])

  useEffect(() => {
    if (isHydrating) {
      return
    }

    const payload: PersistedState = {
      gameState,
      roomIndex,
      coins,
      statusText,
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  }, [coins, gameState, isHydrating, roomIndex, statusText])

  useEffect(() => {
    if (isHydrating || gameState.currentScreen !== 'home' || !selectedPet) {
      return
    }

    const intervalId = window.setInterval(() => {
      setGameState((currentState) => {
        const currentPet = currentState.pets.find(
          (pet) => pet.id === currentState.selectedPetId,
        )

        if (!currentPet || hasAnyZeroStat(currentPet.stats)) {
          return currentState
        }

        const decayedStats = {
          food: clampStat(currentPet.stats.food - 4),
          health: clampStat(currentPet.stats.health - 2),
          happiness: clampStat(currentPet.stats.happiness - 3),
          energy: clampStat(currentPet.stats.energy - 5),
        }

        const nextPets = currentState.pets.map((pet) =>
          pet.id === currentPet.id
            ? {
                ...pet,
                stats: decayedStats,
                mood: getMoodFromStats(decayedStats),
              }
            : pet,
        )

        return {
          ...currentState,
          pets: nextPets,
        }
      })

      setStatusText('Staty se postupne zmensuji. Nenech mazlicka spadnout na nulu.')
    }, STAT_DECAY_INTERVAL_MS)

    return () => window.clearInterval(intervalId)
  }, [gameState.currentScreen, isHydrating, selectedPet])

  useEffect(() => {
    if (isHydrating || gameState.currentScreen !== 'home' || !selectedPet || isPetDead) {
      return
    }

    const intervalId = window.setInterval(() => {
      setCoins((currentCoins) => currentCoins + 1)
    }, COIN_REGEN_INTERVAL_MS)

    return () => window.clearInterval(intervalId)
  }, [gameState.currentScreen, isHydrating, isPetDead, selectedPet])

  useEffect(() => {
    if (!selectedPet || !hasAnyZeroStat(selectedPet.stats) || hasDeathModalOpenRef.current) {
      return
    }

    hasDeathModalOpenRef.current = true
    setStatusText(`${selectedPet.name} uz to nezvladl. Musis zacit novou hru.`)
    setModalState({
      isOpen: true,
      kind: 'dead',
      title: 'Mazlicek zemrel!!',
      message: 'Stat neklesl vcas. Zacni novou hru.',
    })
  }, [selectedPet])

  function handleSelectPet(petId: string) {
    setGameState((currentState) => ({
      ...currentState,
      selectedPetId: petId,
    }))
    setStatusText('Mazlicek je vybrany. Potvrd vyber a muzes zacit hru.')
  }

  function handleConfirmSelection() {
    if (!gameState.selectedPetId) {
      return
    }

    hasDeathModalOpenRef.current = false
    setGameState((currentState) => ({
      ...currentState,
      currentScreen: 'home',
    }))
    setRoomIndex(0)
    setCoins(24)
    setStatusText('Kuchyn je pripravena. Zacni prvni akci a udrzuj staty nad nulou.')
  }

  function handlePrevRoom() {
    setRoomIndex((currentValue) =>
      currentValue === 0 ? rooms.length - 1 : currentValue - 1,
    )
  }

  function handleNextRoom() {
    setRoomIndex((currentValue) =>
      currentValue === rooms.length - 1 ? 0 : currentValue + 1,
    )
  }

  function handleRoomAction() {
    if (!selectedPet || hasAnyZeroStat(selectedPet.stats)) {
      return
    }

    if (coins < currentRoom.actionCost) {
      setStatusText(`Na ${currentRoom.actionLabel.toLowerCase()} potrebujes ${currentRoom.actionCost} penez.`)
      return
    }

    const result = executeRoomAction(currentRoom.id, selectedPet.stats, coins)

    const updatedPets = gameState.pets.map((pet) =>
      pet.id === selectedPet.id
        ? {
            ...pet,
            stats: result.stats,
            mood: getMoodFromStats(result.stats),
          }
        : pet,
    )

    setGameState((currentState) => ({
      ...currentState,
      pets: updatedPets,
    }))
    setCoins(result.coins)
    setStatusText(result.message)
  }

  function handleRequestRestart() {
    setModalState({
      isOpen: true,
      kind: 'restart',
      title: 'Vazne chcete zacit od znova?',
      message: 'Smaze se ulozeny postup i penize.',
    })
  }

  function handleCloseModal() {
    setModalState({
      isOpen: false,
      kind: 'restart',
      title: '',
      message: '',
    })
  }

  function handleRestartGame() {
    window.localStorage.removeItem(STORAGE_KEY)
    hasDeathModalOpenRef.current = false
    setGameState(initialGameState)
    setRoomIndex(0)
    setCoins(24)
    setStatusText('Vyber noveho mazlicka a zacni znovu.')
    setModalState({
      isOpen: false,
      kind: 'restart',
      title: '',
      message: '',
    })
  }

  function handleToggleTheme() {
    setThemeMode((currentTheme) => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
      return nextTheme
    })
    setUsesSystemTheme(false)
  }

  if (isHydrating) {
    return (
      <main className="app-page">
        <section className="phone-shell system-screen">
          <h1>Systemovy stav</h1>
          <div className="system-card">
            <div className="system-card__icon system-card__icon--loading" />
            <p>Nacitam ulozeny stav</p>
          </div>
        </section>
      </main>
    )
  }

  if (storageError) {
    return (
      <main className="app-page">
        <section className="phone-shell system-screen">
          <h1>Systemovy stav</h1>
          <div className="system-card">
            <div className="system-card__icon system-card__icon--error">X</div>
            <p>Nepodarilo se nacist data</p>
          </div>
          <button type="button" className="wire-button wire-button--primary" onClick={handleRestartGame}>
            Zacit znovu
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className={`app-page${isHomeScreen ? ' app-page--home' : ''}`}>
      <section className={`phone-shell${isHomeScreen ? ' phone-shell--home' : ''}`}>
        <header className={`app-shell-header${isHomeScreen ? ' app-shell-header--home' : ''}`}>
          <div className="app-shell-header__copy">
            <p className="app-shell-header__eyebrow">Virtualni Tamagotchi</p>
            <h1 className="app-shell-header__title">nejlepsi tamagotchi na celym svete</h1>
          </div>

          <div className="app-shell-header__actions">
            <button
              type="button"
              className="wire-button wire-button--small app-shell-header__action"
              onClick={handleToggleTheme}
            >
              {themeToggleLabel}
            </button>

            {isHomeScreen ? (
              <button
                type="button"
                className="wire-button wire-button--small wire-button--primary app-shell-header__action"
                onClick={handleRequestRestart}
              >
                nova hra
              </button>
            ) : null}
          </div>
        </header>

        <main className={`app-shell-main${isHomeScreen ? ' app-shell-main--home' : ''}`}>
          {gameState.currentScreen === 'selection' || !selectedPet ? (
            <PetSelectionScreen
              pets={gameState.pets}
              selectedPetId={gameState.selectedPetId}
              onSelectPet={handleSelectPet}
              onConfirmSelection={handleConfirmSelection}
            />
          ) : (
            <HomeScreen
              pet={selectedPet}
              roomId={currentRoom.id}
              roomIndex={roomIndex}
              roomCount={rooms.length}
              roomName={currentRoom.name}
              roomDescription={currentRoom.description}
              roomBackgroundImage={currentRoom.backgroundImage}
              actionIcon={currentRoom.actionIcon}
              actionLabel={currentRoom.actionLabel}
              actionCost={currentRoom.actionCost}
              coins={coins}
              statusText={statusText}
              onPrevRoom={handlePrevRoom}
              onNextRoom={handleNextRoom}
              onRoomAction={handleRoomAction}
              isActionDisabled={isPetDead || cannotAffordAction}
            />
          )}
        </main>

        <footer className="app-shell-footer">
          <p>{gameState.currentScreen === 'home' ? 'Ukladani probiha automaticky.' : 'Vyber mazlicka a zacni hru.'}</p>
        </footer>
      </section>

      <StatusModal
        isOpen={modalState.isOpen}
        title={modalState.title}
        message={modalState.message}
        variant={modalState.kind}
        onClose={handleCloseModal}
        onConfirm={handleRestartGame}
      />
    </main>
  )
}

function isPersistedState(
  value: Partial<PersistedState> | null | undefined,
): value is PersistedState {
  return Boolean(
    value &&
      typeof value.roomIndex === 'number' &&
      typeof value.coins === 'number' &&
      typeof value.statusText === 'string' &&
      value.gameState &&
      Array.isArray(value.gameState.pets),
  )
}

export default App

function getStoredThemeMode() {
  if (typeof window === 'undefined') {
    return null
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : null
}

function getInitialThemeMode() {
  const storedTheme = getStoredThemeMode()

  if (storedTheme) {
    return storedTheme
  }

  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }

  return 'light'
}
