import type { PetAction } from '../types'

type ActionButtonProps = {
  action: PetAction
  onClick: (actionId: PetAction['id']) => void
}

function ActionButton(_: ActionButtonProps) {
  return null
}

export default ActionButton
