export const COLORS = {
  primary: '#6F86E8',
  background: '#F4F7FB',
  surface: '#EEF3F8',
  border: '#D7DFEB',

  text: {
    primary: '#17253A',
    secondary: '#68788F',
  },

  status: {
    loading: '#6F86E8',
    error: '#D56A76',
    success: '#4CD97B',
  },

  stats: {
    hunger: '#FFB347',
    health: '#4CD97B',
    energy: '#5AC8FA',
    happiness: '#FFD93D',
  },
}

export const THEME_STORAGE_KEY = 'tamagotchi-theme'

export type ThemeMode = 'light' | 'dark'

export type ThemePreference = {
  mode: ThemeMode
  usesSystemTheme: boolean
}

export function getInitialThemePreference(): ThemePreference {
  const storedTheme = getStoredThemeMode()

  if (storedTheme) {
    return {
      mode: storedTheme,
      usesSystemTheme: false,
    }
  }

  return {
    mode: getSystemThemeMode(),
    usesSystemTheme: true,
  }
}

export function saveThemeMode(themeMode: ThemeMode) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, themeMode)
  } catch (error) {
    console.error('Theme preference could not be saved.', error)
  }
}

function getStoredThemeMode(): ThemeMode | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

    return isThemeMode(storedTheme) ? storedTheme : null
  } catch (error) {
    console.error('Theme preference could not be loaded.', error)

    return null
  }
}

function getSystemThemeMode(): ThemeMode {
  if (
    typeof window !== 'undefined' &&
    'matchMedia' in window &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark'
  }

  return 'light'
}

function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark'
}
