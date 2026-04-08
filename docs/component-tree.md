# Component tree

Role B component split for the Tamagotchi MVP:

```text
App
|- StatusModal
|- PetSelectionScreen
|  |- ScreenHeader
|  |- PetSelectionList
|  |  |- PetOptionCard
|  |  |  |- PetAvatar
|  |- SelectPetButton
|- HomeScreen
|  |- StatsPanel
|  |  |- StatBar
|  |- RoomStage
|  |  |- PetAvatar
```

State and data ownership:

- `App` owns the game reducer, interval tick, screen transitions and persistence.
- `src/state/game.ts` contains reducer actions and Tamagotchi game rules.
- `src/data/pets.ts` and `src/data/actions.ts` provide sample data for the UI.
- Presentational components receive typed props and stay focused on rendering.
