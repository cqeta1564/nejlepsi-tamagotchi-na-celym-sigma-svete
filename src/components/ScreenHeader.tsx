type ScreenHeaderProps = {
  title: string
  subtitle?: string
}

function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
  return (
    <header className="screen-header">
      <p className="screen-header__eyebrow">Herni obrazovka</p>
      <h2>{title}</h2>
      {subtitle ? <p className="screen-header__subtitle">{subtitle}</p> : null}
    </header>
  )
}

export default ScreenHeader
