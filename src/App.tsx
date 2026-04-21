import {
  startTransition,
  useEffect,
  useEffectEvent,
  useReducer,
  useState,
} from 'react'
import './App.css'
import StatusModal from './components/StatusModal'
import { petActions } from './data/actions'
import { rooms } from './data/rooms'
import { useLocalStorage } from './hooks/useLocalStorage'
import HomeScreen from './screens/HomeScreen'
import PetSelectionScreen from './screens/PetSelectionScreen'
import {
  STORAGE_KEY,
  TICK_INTERVAL_MS,
  createInitialGameState,
  getCurrentRoom,
  gameReducer,
  getSelectedPet,
  sanitizeGameState,
} from './state/game'
import type { PetAction } from './types'

const FALLBACK_ROOM_ACTION: PetAction = {
  id: 'feed',
  label: 'Akce neni dostupna',
  description: 'Pro tuto mistnost chybi navazana akce, takze je docasne vypnuta.',
  effects: {},
}

function App() {
  const [storedState, setStoredState, storageMeta] = useLocalStorage(
    STORAGE_KEY,
    createInitialGameState,
  )
  const [state, dispatch] = useReducer(gameReducer, storedState, sanitizeGameState)
  const [dismissedStorageError, setDismissedStorageError] = useState<
    'load' | 'save' | null
  >(null)

  const selectedPet = getSelectedPet(state)
  const currentRoom = getCurrentRoom(state)
  const selectedPetIsAlive = selectedPet !== null && selectedPet.alive
  const currentRoomAction = petActions.find(
    (action) => action.id === currentRoom.actionId,
  )
  const isRoomActionAvailable = currentRoomAction !== undefined
  const canChangeRoom = rooms.length > 1

  useEffect(() => {
    setStoredState(state)
  }, [setStoredState, state])

  const activeStorageError = storageMeta.saveError
    ? 'save'
    : storageMeta.loadError
      ? 'load'
      : null

  const handleTick = useEffectEvent(() => {
    dispatch({ type: 'tick' })
  })

  useEffect(() => {
    if (state.currentScreen !== 'home' || !selectedPetIsAlive) {
      return
    }

    const intervalId = window.setInterval(() => {
      handleTick()
    }, TICK_INTERVAL_MS)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [selectedPet?.id, selectedPetIsAlive, state.currentScreen])

  const handleSelectPet = (petId: string) => {
    dispatch({
      type: 'selectPet',
      petId,
    })
  }

  const handleConfirmSelection = () => {
    startTransition(() => {
      dispatch({ type: 'confirmSelection' })
    })
  }

  const handleActionClick = (actionId: PetAction['id']) => {
    if (!selectedPetIsAlive) {
      return
    }

    const action = petActions.find((item) => item.id === actionId)

    if (!action) {
      return
    }

    dispatch({
      type: 'performAction',
      action,
    })
  }

  const handleChangePet = () => {
    startTransition(() => {
      dispatch({ type: 'returnToSelection' })
    })
  }

  const handlePreviousRoom = () => {
    dispatch({ type: 'previousRoom' })
  }

  const handleNextRoom = () => {
    dispatch({ type: 'nextRoom' })
  }

  const handleResetGame = () => {
    const shouldReset = window.confirm(
      'Opravdu chces smazat ulozeny postup a zacit novou hru?',
    )

    if (!shouldReset) {
      return
    }

    startTransition(() => {
      dispatch({ type: 'reset' })
    })
  }

  const storageErrorModal =
    activeStorageError !== null && dismissedStorageError !== activeStorageError
      ? activeStorageError === 'save'
        ? {
            title: 'Ukladani je momentalne blokovane',
            message:
              'Prohlizec nepovolil zapis do localStorage. Hra bezi dal, ale po refreshi se postup nemusi obnovit.',
          }
        : {
            title: 'Nepodarilo se obnovit ulozenou hru',
            message: 'Pokracujeme s novou hrou a vychozim stavem.',
          }
      : null

  const deadPetModal =
    state.currentScreen === 'home' &&
    selectedPet !== null &&
    !selectedPetIsAlive
      ? {
          title: 'Mazlicek zemrel!!!',
          message:
            'Zdravi kleslo na nulu. Po zavreni dialogu spustime novou hru od vyberu mazlicka.',
        }
      : null

  const activeModal = deadPetModal ?? storageErrorModal

  const handleCloseModal = () => {
    if (deadPetModal !== null) {
      startTransition(() => {
        dispatch({ type: 'reset' })
      })
      return
    }

    if (activeStorageError !== null) {
      setDismissedStorageError(activeStorageError)
    }
  }

  const storageMessage = storageMeta.saveError
    ? 'Ukladani se nepodarilo. Postup se po refreshi nemusi obnovit.'
    : storageMeta.loadError
      ? 'Ulozeny stav nesel nacist. Pokracujeme od zacatku.'
      : storageMeta.didLoadFromStorage
        ? 'Ulozeny stav byl obnoven.'
        : 'Nova hra je pripravena.'
  const storageMessageTone = storageMeta.loadError || storageMeta.saveError
    ? 'error'
    : storageMeta.didLoadFromStorage
      ? 'success'
      : 'loading'

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <div>
          <p className="app-shell__eyebrow">Sigma tamagotchi</p>
          <h1 className="app-shell__title">Nejlepsi tamagotchi na celym sigma svete</h1>
        </div>
        <p className={`app-shell__status app-shell__status--${storageMessageTone}`}>
          {storageMessage}
        </p>
      </header>

      <main className="app-shell__main">
        {state.currentScreen === 'home' && selectedPet !== null ? (
          <HomeScreen
            pet={selectedPet}
            room={currentRoom}
            roomAction={currentRoomAction ?? FALLBACK_ROOM_ACTION}
            isRoomActionAvailable={isRoomActionAvailable}
            canChangeRoom={canChangeRoom}
            onActionClick={handleActionClick}
            onPreviousRoom={handlePreviousRoom}
            onNextRoom={handleNextRoom}
            onChangePet={handleChangePet}
            onResetGame={handleResetGame}
          />
        ) : (
          <PetSelectionScreen
            pets={state.pets}
            selectedPetId={state.selectedPetId}
            onSelectPet={handleSelectPet}
            onConfirmSelection={handleConfirmSelection}
          />
        )}
      </main>

      <footer className="app-shell__footer">
        <p>Staty se zhorsuji kazdych {TICK_INTERVAL_MS / 1000} sekund a hra se uklada automaticky.</p>
        <p>
          {storageMeta.saveError
            ? 'Ukladani je vypnute, proto si pred refreshem hlidej, ze o postup muzes prijit.'
            : state.currentScreen === 'home' && selectedPet !== null
              ? `Aktivni mazlicek: ${selectedPet.name}. ${selectedPet.statusMessage}`
            : 'Vyber si mazlicka a spust hru.'}
        </p>
      </footer>

      <StatusModal
        isOpen={activeModal !== null}
        title={activeModal?.title ?? ''}
        message={activeModal?.message ?? ''}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default App
