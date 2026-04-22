type PetNameProps = {
  name: string
  species: string
}

function PetName({ name, species }: PetNameProps) {
  return (
    <div className="pet-name">
      <h2>{name}</h2>
      <p>{species}</p>
    </div>
  )
}

export default PetName
