import { useState, type Dispatch, type SetStateAction } from 'react'
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  type LocalStorageMeta,
} from '../utils/storage'

export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T),
): [T, Dispatch<SetStateAction<T>>, LocalStorageMeta] {
  const [state, setState] = useState(() => loadFromLocalStorage(key, initialValue))

  const setValue: Dispatch<SetStateAction<T>> = (nextValue) => {
    setState((currentState) => {
      const value =
        typeof nextValue === 'function'
          ? (nextValue as (previousValue: T) => T)(currentState.value)
          : nextValue
      const didSave = saveToLocalStorage(key, value)

      if (
        Object.is(currentState.value, value) &&
        currentState.meta.saveError === !didSave
      ) {
        return currentState
      }

      return {
        value,
        meta: {
          ...currentState.meta,
          saveError: !didSave,
        },
      }
    })
  }

  return [state.value, setValue, state.meta]
}
