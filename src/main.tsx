import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { THEME_CSS_VARIABLES } from './theme.ts'
import { registerServiceWorker } from './registerServiceWorker'

registerServiceWorker()


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
