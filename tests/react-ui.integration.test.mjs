import assert from 'node:assert/strict'
import { after, before, describe, it } from 'node:test'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'

let vite

const basePet = {
  id: 'pet-1',
  name: 'Bobek',
  species: 'Chaos blob',
  description: 'Mazlicek pro test renderovani.',
  mood: 'happy',
  image: '/test-bobek.png',
  stats: {
    food: 78,
    health: 92,
    happiness: 95,
    energy: 70,
  },
}

before(async () => {
  vite = await createServer({
    appType: 'custom',
    logLevel: 'error',
    server: {
      middlewareMode: true,
    },
  })
})

after(async () => {
  await vite?.close()
})

describe('React UI integration smoke tests', () => {
  it('renders the pet selection screen with selectable pets', async () => {
    const { default: PetSelectionScreen } = await vite.ssrLoadModule(
      '/src/screens/PetSelectionScreen.tsx',
    )
    const pets = [
      basePet,
      {
        ...basePet,
        id: 'pet-2',
        name: 'Bojka',
        mood: 'sleepy',
        image: '/test-bojka.png',
      },
    ]

    const html = renderToStaticMarkup(
      React.createElement(PetSelectionScreen, {
        pets,
        selectedPetId: 'pet-1',
        onSelectPet: () => {},
        onConfirmSelection: () => {},
      }),
    )

    assert.match(html, /Vyber si sveho mazlicka/)
    assert.match(html, /Bobek/)
    assert.match(html, /Bojka/)
    assert.match(html, /aria-pressed="true"/)
    assert.match(html, /potvrdit vyber/)
    assert.doesNotMatch(html, /disabled=/)
  })

  it('renders the home screen with stats, room status and action controls', async () => {
    const { default: HomeScreen } = await vite.ssrLoadModule(
      '/src/screens/HomeScreen.tsx',
    )

    const html = renderToStaticMarkup(
      React.createElement(HomeScreen, {
        pet: basePet,
        roomId: 'kitchen',
        roomIndex: 0,
        roomCount: 4,
        roomName: 'Kuchyn',
        roomDescription: 'Doplni hlad a trosku probere energii.',
        roomBackgroundImage: '/test-room-kitchen.png',
        actionIcon: '/test-action.png',
        actionLabel: 'Kafe s cigem',
        actionCost: 8,
        coins: 24,
        statusText: 'Kuchyn je pripravena.',
        onPrevRoom: () => {},
        onNextRoom: () => {},
        onRoomAction: () => {},
        isActionDisabled: false,
      }),
    )

    assert.match(html, /Kuchyn/)
    assert.match(html, /penize 24/)
    assert.match(html, /hlad/)
    assert.match(html, /zdravi/)
    assert.match(html, /stesti/)
    assert.match(html, /Kuchyn je pripravena\./)
    assert.match(html, /aria-label="Kafe s cigem za 8 penez"/)
  })
})
