import type { Pet, PetAction } from '../types'

type HomeScreenProps = {
  pet: Pet
  actions: PetAction[]
  onActionClick: (actionId: PetAction['id']) => void
}

function HomeScreen(props: HomeScreenProps) {
  void props
  return null
}

export default HomeScreen
