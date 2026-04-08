type ScreenHeaderProps = {
  title: string
  subtitle?: string
}

function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
  return (
    <header className="screen-header">
      <p className="screen-header__eyebrow">MVP flow</p>
      <h2 className="screen-header__title">{title}</h2>
      {subtitle ? (
        <p className="screen-header__subtitle">{subtitle}</p>
      ) : null}
    </header>
  )
}

export default ScreenHeader
