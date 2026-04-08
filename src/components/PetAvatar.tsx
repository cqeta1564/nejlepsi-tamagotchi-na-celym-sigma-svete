import { useState } from 'react'

type PetAvatarProps = {
  src: string
  alt: string
}

function PetAvatar({ src, alt }: PetAvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const fallbackLabel = alt.trim().charAt(0).toUpperCase() || '?'
  const showFallback = !src || failedSrc === src

  return (
    <span className="pet-avatar">
      {showFallback ? (
        <span className="pet-avatar__fallback" aria-hidden="true">
          {fallbackLabel}
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailedSrc(src)}
        />
      )}
    </span>
  )
}

export default PetAvatar
