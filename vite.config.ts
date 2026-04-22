import { createHash } from 'node:crypto'
import { defineConfig, type Plugin } from 'vite'
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

const APP_CACHE_PREFIX = 'sigma-tamagotchi'
const PUBLIC_PWA_FILES = [
  'apple-touch-icon.png',
  'favicon.svg',
  'manifest.webmanifest',
  'maskable-icon-512x512.png',
  'pwa-192x192.png',
  'pwa-512x512.png',
]

function createPwaPlugin(): Plugin {
  let base = '/'

  return {
    name: 'custom-pwa-assets',
    apply: 'build',
    configResolved(config) {
      base = config.base
    },
    generateBundle(_options, bundle) {
      const generatedFiles = Object.values(bundle)
        .map((chunk) => chunk.fileName)
        .filter(
          (fileName) =>
            fileName !== 'sw.js' &&
            /\.(?:css|html|js|json|png|svg|webmanifest)$/i.test(fileName),
        )

      const precacheFiles = Array.from(new Set([...PUBLIC_PWA_FILES, ...generatedFiles])).sort()
      const cacheHash = createHash('sha1')
        .update(precacheFiles.join('|'))
        .digest('hex')
        .slice(0, 8)

      const serviceWorkerSource = `
const CACHE_NAME = '${APP_CACHE_PREFIX}-${cacheHash}';
const CACHE_PREFIX = '${APP_CACHE_PREFIX}-';
const PRECACHE_PATHS = ${JSON.stringify(precacheFiles)};
const APP_SHELL_PATH = '${base}';

const resolveUrl = (path) => new URL(path, self.registration.scope).toString();
const APP_SHELL_URL = resolveUrl(APP_SHELL_PATH);
const INDEX_URL = resolveUrl('index.html');
const PRECACHE_URLS = PRECACHE_PATHS.map(resolveUrl);

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(PRECACHE_URLS);
      self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith(CACHE_PREFIX) && cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName)),
      );

      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(request.url);

  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          return await fetch(request);
        } catch {
          const cache = await caches.open(CACHE_NAME);

          return (
            (await cache.match(request)) ??
            (await cache.match(APP_SHELL_URL)) ??
            (await cache.match(INDEX_URL))
          );
        }
      })(),
    );

    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(request);

      if (cachedResponse) {
        return cachedResponse;
      }

      try {
        const networkResponse = await fetch(request);

        if (networkResponse.ok) {
          await cache.put(request, networkResponse.clone());
        }

        return networkResponse;
      } catch {
        return (
          (await cache.match(APP_SHELL_URL)) ??
          (await cache.match(INDEX_URL)) ??
          Response.error()
        );
      }
    })(),
  );
});
`.trim()

      this.emitFile({
        type: 'asset',
        fileName: 'sw.js',
        source: serviceWorkerSource,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), createPwaPlugin()],
  base: resolveBasePath(),
})
