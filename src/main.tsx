import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { registerServiceWorker } from './registerServiceWorker'
import { getInitialThemePreference } from './theme'

applyInitialTheme()

function applyInitialTheme() {
  const { mode } = getInitialThemePreference()

  document.documentElement.dataset.theme = mode
  document.documentElement.style.colorScheme = mode
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

registerServiceWorker()
