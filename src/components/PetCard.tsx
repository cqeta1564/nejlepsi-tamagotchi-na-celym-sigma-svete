import type { Pet } from '../types'
import PetAvatar from './PetAvatar'
import PetName from './PetName'

type PetCardProps = {
  pet: Pet
}

const MOOD_COPY = {
  happy: 've forme',
  hungry: 'hladovy',
  sleepy: 'ospaly',
  sick: 'slaby',
} as const

function PetCard({ pet }: PetCardProps) {
  return (
    <article className="pet-card">
      <PetAvatar src={pet.image} alt={pet.species} />
      <div className="pet-card__body">
        <div className="pet-card__heading">
          <PetName name={pet.name} species={pet.species} />
          <span className={`pet-card__mood pet-card__mood--${pet.mood}`}>
            {MOOD_COPY[pet.mood]}
          </span>
        </div>

        <p className="pet-card__description">{pet.description}</p>
      </div>
    </article>
  )
}

export default PetCard
