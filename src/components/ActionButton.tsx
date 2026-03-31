import type { PetAction } from '../types'

type ActionButtonProps = {
  action: PetAction
  onClick: (actionId: PetAction['id']) => void
}

function ActionButton(_: ActionButtonProps) {
<<<<<<< Updated upstream
=======
  void _
>>>>>>> Stashed changes
  return null
}

export default ActionButton
