import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  type LocalStorageMeta,
} from '../utils/storage'

export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T),
): [T, Dispatch<SetStateAction<T>>, LocalStorageMeta] {
  const [snapshot] = useState(() => loadFromLocalStorage(key, initialValue))
  const [value, setValue] = useState<T>(snapshot.value)

  useEffect(() => {
    saveToLocalStorage(key, value)
  }, [key, value])

  return [value, setValue, snapshot.meta]
}
