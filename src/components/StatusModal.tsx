type StatusModalProps = {
  isOpen: boolean
  title: string
  message: string
  onClose: () => void
}

function StatusModal({
  isOpen,
  title,
  message,
  onClose,
}: StatusModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="status-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="status-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="status-modal__eyebrow">Systemova zprava</p>
        <h2 id="status-modal-title">{title}</h2>
        <p className="status-modal__message">{message}</p>

        <button type="button" className="primary-button" onClick={onClose}>
          Rozumim
        </button>
      </div>
    </div>
  )
}

export default StatusModal
