export type LocalStorageMeta = {
  didLoadFromStorage: boolean
  error: string | null
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
        error: null,
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
          error: null,
        },
      }
    }

    return {
      value: JSON.parse(storedValue) as T,
      meta: {
        didLoadFromStorage: true,
        error: null,
      },
    }
  } catch {
    return {
      value: fallbackValue,
      meta: {
        didLoadFromStorage: false,
        error: 'load',
      },
    }
  }
}

export function saveToLocalStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore quota and privacy-mode write errors and keep the app interactive.
  }
}
