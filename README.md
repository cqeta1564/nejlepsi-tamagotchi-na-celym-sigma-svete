# Nejlepsi tamagotchi na celym sigma svete

Browserova Tamagotchi hra postavena ve `Vite + React + TypeScript`.

Projekt obsahuje vyber mazlicka, herni obrazovku s mistnostmi, postupne zhorsovani statu v case, akce podle aktualni mistnosti, automaticke ukladani do `localStorage`, svetly/tmavy motiv, PWA vystup a zakladni automaticke testy.

## Co umi aplikace

- vyber jednoho ze 3 vzorovych mazlicku
- zobrazeni statu `food`, `health`, `happiness`, `energy`
- ctyri mistnosti: kuchyn, vecerka, park a kasino
- mistnostni akce s cenou v penezich a dopadem na statistiky mazlicka
- automaticky pokles statu kazdych 12 sekund
- automaticke pridavani penez kazdych 5 sekund
- game over pri padu libovolneho statu na `0`
- plynuly prechod pozadi pri prepinani mistnosti
- svetly/tmavy motiv s ulozenim do `localStorage`
- automaticke ulozeni a obnoveni rozehrane hry
- zaklad PWA: manifest, ikony a produkcni service worker

## Pouzite technologie

- React 19
- TypeScript
- Vite
- ESLint
- Node.js test runner
- GitHub Actions
- GitHub Pages

## Struktura projektu

```text
src/
  assets/       Obrazky mazlicku, mistnosti a ikon
  components/   Znovupouzitelne UI komponenty
  data/         Vzorova data mazlicku
  game/         Cista herni logika a pravidla akci v mistnostech
  screens/      Slozene obrazovky aplikace
  utils/        Utility pro obrazky
  types.ts      Sdilene TypeScript typy
tests/
  roomActions.test.ts             Jednotkove testy herni logiky
  react-ui.integration.test.mjs   Integracni smoke testy React obrazovek
```

## Spusteni projektu

```bash
npm install
npm run dev
```

Aplikace se potom otevre ve Vite development serveru, standardne na `http://localhost:5173`.

## Dostupne skripty

```bash
npm run dev
npm test
npm run lint
npm run build
npm run preview
```

## Testovani

Projekt ma zakladni automaticke testy:

- jednotkove testy ciste herni logiky v `src/game/roomActions.ts`,
- integracni smoke testy React obrazovek pres Vite SSR a `react-dom/server`.

Spusteni:

```bash
npm test
```

## GitHub Pages

Projekt je pripraveny na nasazeni pres GitHub Pages.

- workflow pro deploy je v `.github/workflows/deploy-pages.yml`
- GitHub Actions spousti `npm test`, `npm run lint` a `npm run build`
- pri buildu na GitHub Actions se automaticky nastavi spravny `base` path podle nazvu repozitare
- pro prvni publikaci je potreba v nastaveni repozitare zapnout GitHub Pages a jako source ponechat GitHub Actions

## PWA

Projekt funguje jako zakladni `Progressive Web App`.

- obsahuje `manifest.webmanifest` s nazvem, ikonami a `display: standalone`
- `index.html` odkazuje na manifest pres Vite `BASE_URL`
- `src/main.tsx` registruje service worker v produkcnim prostredi
- pri produkcnim buildu se vygeneruje `sw.js`, ktery prednacita app shell a assety pro offline pouziti
- pro instalaci v telefonu nebo desktopu je potreba bezet pres `HTTPS` nebo na `localhost`

## Herni logika

- stav aplikace se spravuje v `App.tsx` pomoci React hooku
- cista pravidla akci a pomocne funkce jsou v `src/game/roomActions.ts`
- vsechny staty jsou omezeny do rozsahu `0-100`
- nalada mazlicka se odvodi z nizkeho zdravi, energie nebo hladu
- pokud libovolny stat klesne na `0`, otevira se game over modal

## Ukladani stavu

Hra se uklada automaticky do `localStorage` pod klicem `tamagotchi-wireframe-state`. Motiv se uklada samostatne pod klicem `tamagotchi-theme`.

## Stav odevzdani

Repo obsahuje funkcni webovou hru s aktualnim README, uklizenym render stromem, zakladnim PWA zapojenim, testy, lintem, produkcnim buildem a automatizovanym deployem na GitHub Pages.
