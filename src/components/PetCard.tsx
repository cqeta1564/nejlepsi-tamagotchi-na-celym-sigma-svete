import PetAvatar from './PetAvatar'
import PetName from './PetName'
import type { Pet } from '../types'

type PetCardProps = {
  pet: Pet
}

const moodCopy = {
  happy: 'Spokojeny',
  hungry: 'Hladovy',
  sleepy: 'Unaveny',
  sick: 'Potrebuje peci',
}

function PetCard({ pet }: PetCardProps) {
  return (
    <article className="pet-card">
      <div className="pet-card__visual">
        <PetAvatar src={pet.image} alt={pet.species} />
      </div>

      <div className="pet-card__content">
        <div className="pet-card__headline">
          <PetName name={pet.name} species={pet.species} />
          <span className={`mood-badge mood-badge--${pet.mood}`}>
            {moodCopy[pet.mood]}
          </span>
        </div>

        <p className="pet-card__description">{pet.description}</p>
      </div>
    </article>
  )
}

export default PetCard
