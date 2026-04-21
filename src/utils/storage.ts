export type LocalStorageMeta = {
  didLoadFromStorage: boolean
  loadError: boolean
  saveError: boolean
}

type StoredSnapshot<T> = {
  value: T
  meta: LocalStorageMeta
}

export function resolveInitialValue<T>(initialValue: T | (() => T)) {
  return typeof initialValue === 'function'
    ? (initialValue as () => T)()
    : initialValue
}

export function loadFromLocalStorage<T>(
  key: string,
  initialValue: T | (() => T),
): StoredSnapshot<T> {
  const fallbackValue = resolveInitialValue(initialValue)

  if (typeof window === 'undefined') {
    return {
      value: fallbackValue,
      meta: {
        didLoadFromStorage: false,
        loadError: false,
        saveError: false,
      },
    }
  }

  try {
    const storedValue = window.localStorage.getItem(key)

    if (storedValue === null) {
      return {
        value: fallbackValue,
        meta: {
          didLoadFromStorage: false,
          loadError: false,
          saveError: false,
        },
      }
    }

    return {
      value: JSON.parse(storedValue) as T,
      meta: {
        didLoadFromStorage: true,
        loadError: false,
        saveError: false,
      },
    }
  } catch {
    return {
      value: fallbackValue,
      meta: {
        didLoadFromStorage: false,
        loadError: true,
        saveError: false,
      },
    }
  }
}

export function saveToLocalStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') {
    return true
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}
