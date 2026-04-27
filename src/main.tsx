import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import bobekImage from './assets/bobek.png'
import { loadCleanedImage } from './utils/imageCutout'

const THEME_STORAGE_KEY = 'tamagotchi-theme'

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
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  const resolvedTheme =
    storedTheme === 'light' || storedTheme === 'dark'
      ? storedTheme
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'

  document.documentElement.dataset.theme = resolvedTheme
  document.documentElement.style.colorScheme = resolvedTheme
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
