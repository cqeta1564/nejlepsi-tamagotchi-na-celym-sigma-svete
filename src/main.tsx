import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { THEME_CSS_VARIABLES } from './theme.ts'

for (const [variable, value] of Object.entries(THEME_CSS_VARIABLES)) {
  document.documentElement.style.setProperty(variable, value)
}
=======
import { registerServiceWorker } from './registerServiceWorker'

registerServiceWorker()
>>>>>>> Stashed changes

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
