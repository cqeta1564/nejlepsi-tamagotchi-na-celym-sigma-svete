import { useState } from 'react'

type PetAvatarProps = {
  src: string
  alt: string
}

const avatarMap: Record<string, string> = {
  cat: 'CAT',
  fox: 'FOX',
  axolotl: 'AXO',
  dog: 'DOG',
  robot: 'BOT',
  dragon: 'DRG',
}

function PetAvatar({ src, alt }: PetAvatarProps) {
  const [hasError, setHasError] = useState(false)

  const fallbackEmoji =
    avatarMap[alt.toLowerCase()] ??
    avatarMap[alt.split(' ')[0]?.toLowerCase() ?? ''] ??
    'PET'

  return (
    <div className="pet-avatar" aria-label={alt}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          className="pet-avatar__image"
          onError={() => setHasError(true)}
        />
      ) : null}

      <span
        className={`pet-avatar__fallback${hasError ? ' pet-avatar__fallback--visible' : ''}`}
        aria-hidden={!hasError}
      >
        {fallbackEmoji}
      </span>
    </div>
  )
}

export default PetAvatar
