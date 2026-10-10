import './LoginButton.css'

interface LoginButtonProps {
  onClick?: () => void
  disabled?: boolean
}

export function LoginButton({ onClick, disabled = false }: LoginButtonProps) {
  return (
    <button
      className="login-button"
      onClick={onClick}
      disabled={disabled}
      type="button"
      aria-label="Войти в систему"
    >
      Войти
    </button>
  )
}