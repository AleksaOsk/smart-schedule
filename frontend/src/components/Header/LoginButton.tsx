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
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '18px',
        padding: '13px 25px',
        fontFamily: 'Segoe UI Emoji',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '24px',
        color: '#111827',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      Войти
    </button>
  )
}