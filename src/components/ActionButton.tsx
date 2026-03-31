import type { PetAction } from '../types'

type ActionButtonProps = {
  action: PetAction
  onClick: (actionId: PetAction['id']) => void
}

function ActionButton(props: ActionButtonProps) {
  void props
  return null
}

export default ActionButton
