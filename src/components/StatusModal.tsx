type StatusModalProps = {
  isOpen: boolean
  title: string
  message: string
  variant?: 'info' | 'restart' | 'dead'
  onClose: () => void
  onConfirm?: () => void
}

function StatusModal({
  isOpen,
  title,
  message,
  variant = 'info',
  onClose,
  onConfirm,
}: StatusModalProps) {
  if (!isOpen) {
    return null
  }

  const buttonLabel = variant === 'info' ? 'zavrit' : 'Zacit znovu'

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div className="wire-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <p className="wire-modal__title">{title}</p>
        {message ? <p className="wire-modal__message">{message}</p> : null}
        <button
          type="button"
          className="wire-button wire-button--modal wire-button--primary"
          onClick={onConfirm ?? onClose}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}

export default StatusModal
