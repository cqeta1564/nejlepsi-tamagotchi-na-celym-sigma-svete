import { useEffect, useState } from 'react'

type CutoutImageProps = {
  src: string
  alt: string
  className: string
  onError?: () => void
}

const cleanedImageCache = new Map<string, string>()

function removeBrightEdgeBackground(image: HTMLImageElement) {
  const width = image.naturalWidth || image.width
  const height = image.naturalHeight || image.height
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context || width === 0 || height === 0) {
    return image.src
  }

  canvas.width = width
  canvas.height = height
  context.drawImage(image, 0, 0, width, height)

  const imageData = context.getImageData(0, 0, width, height)
  const { data } = imageData
  const visited = new Uint8Array(width * height)
  const queue = new Uint32Array(width * height)
  let head = 0
  let tail = 0

  function tryEnqueue(x: number, y: number) {
    if (x < 0 || x >= width || y < 0 || y >= height) {
      return
    }

    const index = y * width + x

    if (visited[index]) {
      return
    }

    visited[index] = 1

    const offset = index * 4
    const alpha = data[offset + 3]
    const average = (data[offset] + data[offset + 1] + data[offset + 2]) / 3

    if (alpha === 0 || average >= 220) {
      queue[tail] = index
      tail += 1
    }
  }

  for (let x = 0; x < width; x += 1) {
    tryEnqueue(x, 0)
    tryEnqueue(x, height - 1)
  }

  for (let y = 0; y < height; y += 1) {
    tryEnqueue(0, y)
    tryEnqueue(width - 1, y)
  }

  while (head < tail) {
    const index = queue[head]
    head += 1

    const offset = index * 4
    const x = index % width
    const y = Math.floor(index / width)

    data[offset] = 255
    data[offset + 1] = 255
    data[offset + 2] = 255
    data[offset + 3] = 0

    tryEnqueue(x - 1, y)
    tryEnqueue(x + 1, y)
    tryEnqueue(x, y - 1)
    tryEnqueue(x, y + 1)
  }

  context.putImageData(imageData, 0, 0)

  return canvas.toDataURL('image/png')
}

function CutoutImage({ src, alt, className, onError }: CutoutImageProps) {
  const [loadedImage, setLoadedImage] = useState<{
    src: string
    cleanedSrc: string
  } | null>(null)
  const cachedSrc = cleanedImageCache.get(src) ?? null
  const displaySrc = cachedSrc ?? (loadedImage?.src === src ? loadedImage.cleanedSrc : null)

  useEffect(() => {
    if (cachedSrc) {
      return
    }

    let isActive = true
    const image = new Image()

    image.decoding = 'async'
    image.onload = () => {
      if (!isActive) {
        return
      }

      const cleanedSrc = removeBrightEdgeBackground(image)
      cleanedImageCache.set(src, cleanedSrc)
      setLoadedImage({
        src,
        cleanedSrc,
      })
    }

    image.onerror = () => {
      if (!isActive) {
        return
      }

      onError?.()
    }

    image.src = src

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
