type SelectPetButtonProps = {
  disabled?: boolean
  onClick: () => void
}

function SelectPetButton({ disabled, onClick }: SelectPetButtonProps) {
  return (
    <button
      type="button"
      className="wire-button wire-button--confirm wire-button--primary"
      disabled={disabled}
      onClick={onClick}
    >
      potvrdit vyber
    </button>
  )
}

export default SelectPetButton
