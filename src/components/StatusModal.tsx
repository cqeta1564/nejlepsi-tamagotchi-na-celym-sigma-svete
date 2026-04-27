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

  const buttonLabel = variant === 'info' ? 'Potvrdit' : 'Zacit znovu'
  const secondaryLabel = variant === 'dead' ? 'Zpet' : 'Zrusit'
  const modalIcon = variant === 'dead' ? '☠' : variant === 'restart' ? '↺' : '✦'
  const confirmButtonClass =
    variant === 'restart' || variant === 'dead'
      ? 'wire-button wire-button--modal wire-button--danger'
      : 'wire-button wire-button--modal wire-button--primary'

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className={`wire-modal wire-modal--${variant}`}
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="wire-modal__icon" aria-hidden="true">{modalIcon}</div>
        <p className="wire-modal__title">{title}</p>
        {message ? <p className="wire-modal__message">{message}</p> : null}
        <div className="wire-modal__actions">
          {variant !== 'info' ? (
            <button
              type="button"
              className="wire-button wire-button--modal wire-button--secondary"
              onClick={onClose}
            >
              {secondaryLabel}
            </button>
          ) : null}
          <button type="button" className={confirmButtonClass} onClick={onConfirm ?? onClose}>
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default StatusModal
