import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import bobekImage from './assets/bobek.png'
import { registerServiceWorker } from './registerServiceWorker'
import { getInitialThemePreference } from './theme'
import { loadCleanedImage } from './utils/imageCutout'

applyInitialTheme()

void loadCleanedImage(bobekImage, {
  trim: true,
  paddingRatio: 0.12,
  outputSize: 256,
}).then((cleanedSrc) => {
  const iconSelectors = ['link[rel="icon"]', 'link[rel="apple-touch-icon"]']

  iconSelectors.forEach((selector) => {
    let link = document.head.querySelector<HTMLLinkElement>(selector)

    if (!link) {
      link = document.createElement('link')
      link.rel = selector.includes('apple') ? 'apple-touch-icon' : 'icon'
      document.head.appendChild(link)
    }

    link.type = 'image/png'
    link.href = cleanedSrc
  })
})

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
