# Component tree

Current render tree for the Tamagotchi MVP:

```text
App
|- StatusModal
|- PetSelectionScreen
|  |- screen heading (inline in PetSelectionScreen)
|  |- PetSelectionList
|  |  |- PetOptionCard
|  |  |  |- PetAvatar
|  |- SelectPetButton
|- HomeScreen
|  |- StatsPanel
|  |  |- StatChip
|  |- PetCard
|  |  |- CutoutImage
|  |  |- PetAvatar
|  |  |  |- PetFace
```

State and data ownership:

- `App` owns the game state, interval ticks, screen transitions and persistence.
- Room metadata is defined in `src/App.tsx`; action costs and effects live in `src/game/roomActions.ts`.
- `src/data/pets.ts` provides sample pet data for the UI.
- Presentational components receive typed props and stay focused on rendering.
