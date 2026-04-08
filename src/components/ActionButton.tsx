import type { PetAction } from '../types'

type ActionButtonProps = {
  action: PetAction
  disabled?: boolean
  onClick: (actionId: PetAction['id']) => void
}

function ActionButton({ action, disabled = false, onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      className="action-button"
      disabled={disabled}
      onClick={() => onClick(action.id)}
    >
      <span className="action-button__label">{action.label}</span>
      <span className="action-button__description">{action.description}</span>
    </button>
  )
}

export default ActionButton
