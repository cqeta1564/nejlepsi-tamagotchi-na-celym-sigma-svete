type SelectPetButtonProps = {
  disabled?: boolean
  onClick: () => void
}

function SelectPetButton({ disabled, onClick }: SelectPetButtonProps) {
  return (
    <button
      type="button"
      className="primary-button"
      disabled={disabled}
      onClick={onClick}
    >
      Zacit hru s vybranym mazlickem
    </button>
  )
}

export default SelectPetButton
