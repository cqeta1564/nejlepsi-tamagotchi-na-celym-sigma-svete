import type { PetAction } from '../types'

type ActionButtonProps = {
  action: PetAction
  onClick: (actionId: PetAction['id']) => void
}

function ActionButton({ action, onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      className="action-button"
      onClick={() => onClick(action.id)}
    >
      <span className="action-button__label">{action.label}</span>
      <span className="action-button__description">{action.description}</span>
    </button>
  )
}

export default ActionButton
