import type { ReactNode } from 'react'
import { useState } from 'react'
import CutoutImage from './CutoutImage'

type PetAvatarProps = {
  src: string
  alt: string
  children?: ReactNode
}

function PetAvatar({ src, alt, children }: PetAvatarProps) {
  const [hasError, setHasError] = useState(false)
  const fallback = alt.slice(0, 1).toUpperCase()

  return (
    <span className="avatar-circle" aria-label={alt}>
      {!hasError ? (
        <CutoutImage
          src={src}
          alt=""
          className="avatar-circle__image"
          width={768}
          height={768}
          onError={() => setHasError(true)}
        />
      ) : null}
      {children}
      {hasError ? <span className="avatar-circle__fallback">{fallback}</span> : null}
    </span>
  )
}

export default PetAvatar
