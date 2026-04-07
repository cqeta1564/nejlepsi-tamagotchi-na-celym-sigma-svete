import type { Pet } from '../types'

type PetOptionCardProps = {
  pet: Pet
  isSelected: boolean
  onSelect: (petId: string) => void
}

function PetOptionCard(props: PetOptionCardProps) {
  void props
  return null
}

export default PetOptionCard
