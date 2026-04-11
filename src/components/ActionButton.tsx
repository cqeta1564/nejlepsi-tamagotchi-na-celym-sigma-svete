import type { PetAction } from '../types'

type ActionButtonProps = {
  action: PetAction
  onClick: (actionId: PetAction['id']) => void
}

const actionIcons: Record<PetAction['id'], string> = {
  feed: 'FOOD',
  heal: 'HEAL',
  play: 'PLAY',
  sleep: 'REST',
}

function ActionButton({ action, onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      className="action-button"
      onClick={() => onClick(action.id)}
    >
      <span className="action-button__icon" aria-hidden="true">
        {actionIcons[action.id]}
      </span>

      <span className="action-button__content">
        <strong>{action.label}</strong>
        <span>{action.description}</span>
      </span>
    </button>
  )
}

export default ActionButton
