import { useEffect, useState } from 'react'
import { loadCleanedImage } from '../utils/imageCutout'

type CutoutImageProps = {
  src: string
  alt: string
  className: string
  onError?: () => void
}

type LoadedImage = {
  src: string
  displaySrc: string
}

function CutoutImage({ src, alt, className, onError }: CutoutImageProps) {
  const [loadedImage, setLoadedImage] = useState<LoadedImage | null>(null)

  useEffect(() => {
    let isActive = true
    loadCleanedImage(src)
      .then((cleanedSrc) => {
        if (!isActive) {
          return
        }

        setLoadedImage({ src, displaySrc: cleanedSrc })
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
  }, [onError, src])

  const displaySrc = loadedImage?.src === src ? loadedImage.displaySrc : null

  if (!displaySrc) {
    return null
  }

  return <img src={displaySrc} alt={alt} className={className} onError={onError} />
}

export default CutoutImage
