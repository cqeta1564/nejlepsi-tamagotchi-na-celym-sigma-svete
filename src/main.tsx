import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { THEME_CSS_VARIABLES } from './theme.ts'
import { registerServiceWorker } from './registerServiceWorker'

for (const [variable, value] of Object.entries(THEME_CSS_VARIABLES)) {
  document.documentElement.style.setProperty(variable, value)
}

registerServiceWorker()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
