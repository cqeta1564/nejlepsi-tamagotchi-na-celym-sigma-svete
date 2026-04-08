# Nejlepsi tamagotchi na celym sigma svete

Minimalni MVP Tamagotchi aplikace postavene ve `Vite + React + TypeScript`.

Projekt obsahuje vyber mazlicka, herni smycku se zhorsovanim statu v case, akce nad petem a obnovu postupu z `localStorage`.

## Co umi aplikace

- vyber jednoho ze 3 vzorovych mazlicku
- zobrazeni aktualnich statu: `food`, `health`, `happiness`, `energy`
- herni akce `feed`, `play`, `sleep`, `heal`
- automaticky tick pres `setInterval`, ktery postupne zhorsuje staty
- odvozeny stav mazlicka: `mood`, `status`, `statusMessage`, `alive`
- game over pri padu zdravi na `0`
- automaticke ukladani a obnoveni hry z `localStorage`

## Pouzite technologie

- React 19
- TypeScript
- Vite
- ESLint

## Struktura projektu

```text
src/
  components/   Znovupouzitelne UI komponenty
  data/         Vzorova data mazlicku a akci
  hooks/        Custom hooky
  screens/      Slozene obrazovky aplikace
  state/        Herni reducer a logika Tamagotchi
  utils/        Utility pro storage a praci se staty
  types.ts      Sdilene TypeScript typy
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
npm run build
npm run lint
npm run preview
```

## GitHub Pages

Projekt je pripraveny na nasazeni pres GitHub Pages.

- workflow pro deploy je v `.github/workflows/deploy-pages.yml`
- pri buildu na GitHub Actions se automaticky nastavi spravny `base` path podle nazvu repozitare
- pro prvni publikaci je potreba v nastaveni repozitare zapnout GitHub Pages a jako source ponechat GitHub Actions

## Herni logika

- stav aplikace se spravuje centralne pres `useReducer`
- kazdych `5` sekund probiha tick, ktery snizuje vybrane staty
- vsechny hodnoty jsou omezeny do rozsahu `0-100`
- nizke hodnoty `food`, `energy` a `happiness` postupne poskozuji `health`
- pokud `health` klesne na `0`, mazlicek uz neni `alive`

## Ukladani stavu

Hra se uklada automaticky do `localStorage` pod klicem `sigma-tamagotchi-state`. Po reloadu stranky se posledni stav obnovi.

## Stav odevzdani

Repo aktualne obsahuje funkcni MVP pro Role B:

- tyden 1: komponenty, typy, vzorova data a zakladni struktura projektu
- tyden 2: herni logika, reducer, interval, odvozeny stav a persistence

Poznamka: nastaveni collaboratoru na GitHubu neni soucasti souboru v repozitari, takze se overuje mimo kodovou zakladnu.
