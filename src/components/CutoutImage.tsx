import { useEffect, useState } from 'react'
import { loadCleanedImage } from '../utils/imageCutout'

type CutoutImageProps = {
  src: string
  alt: string
  className: string
  onError?: () => void
}

function CutoutImage({ src, alt, className, onError }: CutoutImageProps) {
  const [displaySrc, setDisplaySrc] = useState<string | null>(null)

  useEffect(() => {
    setDisplaySrc(null)

    let isActive = true
    loadCleanedImage(src)
      .then((cleanedSrc) => {
        if (!isActive) {
          return
        }

        setDisplaySrc(cleanedSrc)
      })
      .catch(() => {
        if (!isActive) {
          return
        }

        onError?.()
      })

    return () => {
      isActive = false
    }
  }, [cachedSrc, onError, src])

  if (!displaySrc) {
    return null
  }

  return <img src={displaySrc} alt={alt} className={className} onError={onError} />
}

export default CutoutImage
