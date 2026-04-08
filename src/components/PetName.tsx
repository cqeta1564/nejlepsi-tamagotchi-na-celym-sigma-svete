type PetNameProps = {
  name: string
  species: string
}

function PetName({ name, species }: PetNameProps) {
  return (
    <span className="pet-name">
      <span className="pet-name__title">{name}</span>
      <span className="pet-name__subtitle">{species}</span>
    </span>
  )
}

export default PetName
