import { useEffect } from 'react'

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
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div className="status-modal" onClick={onClose}>
      <div
        className="status-modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="status-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="status-modal-title">{title}</h2>
        <p>{message}</p>
        <button type="button" className="primary-button" onClick={onClose}>
          Rozumim
        </button>
      </div>
    </div>
  )
}

export default StatusModal
