import type { PetAction } from '../types'

type ActionsPanelProps = {
  actions: PetAction[]
  onActionClick: (actionId: PetAction['id']) => void
}

function ActionsPanel(props: ActionsPanelProps) {
  void props
  return null
}

export default ActionsPanel
