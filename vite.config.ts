import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const FALLBACK_REPOSITORY_NAME = 'nejlepsi-tamagotchi-na-celym-sigma-svete'

function resolveBasePath() {
  const repositoryName =
    process.env.GITHUB_REPOSITORY?.split('/')[1] ?? FALLBACK_REPOSITORY_NAME

  if (process.env.BASE_PATH) {
    return process.env.BASE_PATH
  }

  return process.env.GITHUB_ACTIONS ? `/${repositoryName}/` : '/'
}

// https://vite.dev/config/
export default defineConfig({
  base: resolveBasePath(),
  plugins: [react()],
})
