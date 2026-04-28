type CutoutImageProps = {
  src: string
  alt: string
  className: string
  width?: number
  height?: number
  onError?: () => void
}

function CutoutImage({ src, alt, className, width, height, onError }: CutoutImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      onError={onError}
    />
  )
}

export default CutoutImage
