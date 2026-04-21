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
- Room actions are defined inline in `src/App.tsx` together with their game effects.
- `src/data/pets.ts` provides sample pet data for the UI.
- Presentational components receive typed props and stay focused on rendering.
