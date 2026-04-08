type SelectPetButtonProps = {
  disabled?: boolean
  onClick: () => void
}

function SelectPetButton({
  disabled = false,
  onClick,
}: SelectPetButtonProps) {
  return (
    <button
      type="button"
      className="primary-button"
      disabled={disabled}
      onClick={onClick}
    >
      Potvrdit vyber
    </button>
  )
}

export default SelectPetButton
