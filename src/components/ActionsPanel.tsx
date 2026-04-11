import ActionButton from './ActionButton'
import type { PetAction } from '../types'

type ActionsPanelProps = {
  actions: PetAction[]
  onActionClick: (actionId: PetAction['id']) => void
}

function ActionsPanel({ actions, onActionClick }: ActionsPanelProps) {
  return (
    <section className="panel">
      <div className="panel__heading">
        <p className="panel__eyebrow">Akce</p>
        <h3>Co bude mazlicek delat ted?</h3>
      </div>

      <div className="actions-grid">
        {actions.map((action) => (
          <ActionButton
            key={action.id}
            action={action}
            onClick={onActionClick}
          />
        ))}
      </div>
    </section>
  )
}

export default ActionsPanel
