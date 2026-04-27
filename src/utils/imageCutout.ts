const cleanedImageCache = new Map<string, string>()

type CleanImageOptions = {
  trim?: boolean
  paddingRatio?: number
  outputSize?: number
}

export function removeBrightEdgeBackground(
  image: HTMLImageElement,
  options: CleanImageOptions = {},
) {
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

  if (!options.trim) {
    return canvas.toDataURL('image/png')
  }

  let minX = width
  let minY = height
  let maxX = -1
  let maxY = -1

  for (let index = 0; index < width * height; index += 1) {
    const alpha = data[index * 4 + 3]

    if (alpha === 0) {
      continue
    }

    const x = index % width
    const y = Math.floor(index / width)

    if (x < minX) minX = x
    if (y < minY) minY = y
    if (x > maxX) maxX = x
    if (y > maxY) maxY = y
  }

  if (maxX < 0 || maxY < 0) {
    return canvas.toDataURL('image/png')
  }

  const cropWidth = maxX - minX + 1
  const cropHeight = maxY - minY + 1
  const longestSide = Math.max(cropWidth, cropHeight)
  const outputSize = options.outputSize ?? longestSide
  const paddingRatio = options.paddingRatio ?? 0.14
  const paddedSize = outputSize * (1 - paddingRatio * 2)
  const scale = paddedSize / longestSide
  const destinationWidth = cropWidth * scale
  const destinationHeight = cropHeight * scale
  const outputCanvas = document.createElement('canvas')
  const outputContext = outputCanvas.getContext('2d')

  if (!outputContext) {
    return canvas.toDataURL('image/png')
  }

  outputCanvas.width = outputSize
  outputCanvas.height = outputSize
  outputContext.clearRect(0, 0, outputSize, outputSize)
  outputContext.imageSmoothingEnabled = true
  outputContext.imageSmoothingQuality = 'high'
  outputContext.drawImage(
    canvas,
    minX,
    minY,
    cropWidth,
    cropHeight,
    (outputSize - destinationWidth) / 2,
    (outputSize - destinationHeight) / 2,
    destinationWidth,
    destinationHeight,
  )

  return outputCanvas.toDataURL('image/png')
}

export function loadCleanedImage(
  src: string,
  options: CleanImageOptions = {},
): Promise<string> {
  const cacheKey = `${src}|${options.trim ? 'trim' : 'raw'}|${options.paddingRatio ?? ''}|${options.outputSize ?? ''}`
  const cachedSrc = cleanedImageCache.get(cacheKey)

  if (cachedSrc) {
    return Promise.resolve(cachedSrc)
  }

  return new Promise((resolve, reject) => {
    const image = new Image()

    image.decoding = 'async'
    image.onload = () => {
      const cleanedSrc = removeBrightEdgeBackground(image, options)
      cleanedImageCache.set(cacheKey, cleanedSrc)
      resolve(cleanedSrc)
    }
    image.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    image.src = src
  })
}

