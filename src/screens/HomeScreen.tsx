import type { Pet, PetAction } from '../types'

type HomeScreenProps = {
  pet: Pet
  actions: PetAction[]
  onActionClick: (actionId: PetAction['id']) => void
}

function HomeScreen(_: HomeScreenProps) {
<<<<<<< Updated upstream
=======
  void _
>>>>>>> Stashed changes
  return null
}

export default HomeScreen
