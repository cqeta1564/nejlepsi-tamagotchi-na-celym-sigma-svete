import type { PetAction } from '../types'
import ActionButton from './ActionButton'

type ActionsPanelProps = {
  actions: PetAction[]
  disabled?: boolean
  onActionClick: (actionId: PetAction['id']) => void
}

function ActionsPanel({
  actions,
  disabled = false,
  onActionClick,
}: ActionsPanelProps) {
  return (
    <section className="actions-panel" aria-label="Akce mazlicka">
      {actions.map((action) => (
        <ActionButton
          key={action.id}
          action={action}
          disabled={disabled}
          onClick={onActionClick}
        />
      ))}
    </section>
  )
}

export default ActionsPanel
