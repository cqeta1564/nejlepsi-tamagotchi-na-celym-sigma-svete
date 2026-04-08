export const COLORS = {
  primary: '#7A7F8C',
  background: '#F2F3F5',
  surface: '#E6E8EB',
  border: '#C9CDD3',
  text: {
    primary: '#000000',
    secondary: '#9E9BBB',
  },
  status: {
    loading: '#7EA9C7',
    error: '#C77E7E',
    success: '#7EBF9B',
  },
  stats: {
    hunger: '#FFB347',
    health: '#4CD97B',
    energy: '#5AC8FA',
    happiness: '#FFD93D',
  },
} as const

export const THEME_CSS_VARIABLES = {
  '--color-bg': COLORS.background,
  '--color-surface': COLORS.surface,
  '--color-surface-muted': '#ffffff',
  '--color-border': COLORS.border,
  '--color-text': COLORS.text.primary,
  '--color-text-muted': COLORS.text.secondary,
  '--color-accent-dark': COLORS.primary,
  '--color-food': COLORS.stats.hunger,
  '--color-health': COLORS.stats.health,
  '--color-energy': COLORS.stats.energy,
  '--color-happiness': COLORS.stats.happiness,
  '--color-status-loading': COLORS.status.loading,
  '--color-status-error': COLORS.status.error,
  '--color-status-success': COLORS.status.success,
} as const
