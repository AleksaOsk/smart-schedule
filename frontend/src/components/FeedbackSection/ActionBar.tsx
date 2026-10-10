import './ActionBar.css'

interface ActionBarProps {
  primaryLabel?: string
  secondaryLabel?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
  primaryDisabled?: boolean
  secondaryDisabled?: boolean
}

export function ActionBar({
  primaryLabel = 'Начать планирование',
  secondaryLabel = 'Узнать больше',
  onPrimaryClick,
  onSecondaryClick,
  primaryDisabled = false,
  secondaryDisabled = false,
}: ActionBarProps) {
  return (
    <div className="action-bar" role="group" aria-label="Основные действия">
      <button
        className="action-bar__button action-bar__button--primary"
        onClick={onPrimaryClick}
        disabled={primaryDisabled}
        type="button"
      >
        {primaryLabel}
      </button>
      <button
        className="action-bar__button action-bar__button--secondary"
        onClick={onSecondaryClick}
        disabled={secondaryDisabled}
        type="button"
      >
        {secondaryLabel}
      </button>
    </div>
  )
}