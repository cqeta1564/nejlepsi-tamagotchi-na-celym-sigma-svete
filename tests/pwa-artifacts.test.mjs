import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { describe, it } from 'node:test'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(projectRoot, 'public')
const distDir = join(projectRoot, 'dist')

const requiredPwaFiles = [
  'apple-touch-icon.png',
  'favicon.svg',
  'manifest.webmanifest',
  'maskable-icon-512x512.png',
  'pwa-192x192.png',
  'pwa-512x512.png',
]

function readTextFile(filePath) {
  return readFileSync(filePath, 'utf8')
}

describe('PWA production artifacts', () => {
  it('keeps the public manifest installable', () => {
    const manifestPath = join(publicDir, 'manifest.webmanifest')
    const manifest = JSON.parse(readTextFile(manifestPath))

    assert.equal(manifest.name, 'Nejlepsi tamagotchi na celym sigma svete')
    assert.equal(manifest.short_name, 'SigmaGotchi')
    assert.equal(manifest.lang, 'cs')
    assert.equal(manifest.display, 'standalone')
    assert.equal(manifest.start_url, './')
    assert.equal(manifest.scope, './')
    assert.ok(manifest.theme_color)
    assert.ok(manifest.background_color)
    assert.ok(Array.isArray(manifest.icons))
    assert.ok(
      manifest.icons.some((icon) => icon.src === './pwa-192x192.png' && icon.sizes === '192x192'),
    )
    assert.ok(
      manifest.icons.some((icon) => icon.src === './pwa-512x512.png' && icon.sizes === '512x512'),
    )
    assert.ok(
      manifest.icons.some(
        (icon) => icon.src === './maskable-icon-512x512.png' && icon.purpose === 'maskable',
      ),
    )
  })

  it('has all referenced PWA files in public', () => {
    requiredPwaFiles.forEach((fileName) => {
      assert.ok(existsSync(join(publicDir, fileName)), `${fileName} is missing from public/`)
    })
  })

  it('links the manifest and generates a service worker in dist', () => {
    const indexPath = join(distDir, 'index.html')
    const serviceWorkerPath = join(distDir, 'sw.js')

    assert.ok(existsSync(indexPath), 'Run npm run build before npm run verify:pwa.')
    assert.ok(existsSync(serviceWorkerPath), 'Production build did not emit dist/sw.js.')

    const indexHtml = readTextFile(indexPath)
    const serviceWorker = readTextFile(serviceWorkerPath)

    assert.match(indexHtml, /<link rel="manifest" href="[^"]*manifest\.webmanifest"/)
    assert.match(serviceWorker, /self\.addEventListener\('install'/)
    assert.match(serviceWorker, /self\.addEventListener\('activate'/)
    assert.match(serviceWorker, /self\.addEventListener\('fetch'/)

    requiredPwaFiles.forEach((fileName) => {
      assert.match(serviceWorker, new RegExp(fileName.replace('.', '\\.')))
    })
  })
})
