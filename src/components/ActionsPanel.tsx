import type { PetAction } from '../types'

type ActionsPanelProps = {
  actions: PetAction[]
  onActionClick: (actionId: PetAction['id']) => void
}

function ActionsPanel(_: ActionsPanelProps) {
<<<<<<< Updated upstream
=======
  void _
>>>>>>> Stashed changes
  return null
}

export default ActionsPanel
