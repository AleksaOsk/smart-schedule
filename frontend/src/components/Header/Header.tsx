import { Logo } from './Logo'
import { LoginButton } from './LoginButton'
import './Header.css'

interface HeaderProps {
  onLoginClick?: () => void
}

export function Header({ onLoginClick }: HeaderProps) {
  return (
    <header className="header" role="banner">
      <div className="header-container">
        <div className="header-left">
          <Logo size={40} ariaLabel="SmartSchedule — умное планирование" />
        </div>
        <nav className="header-nav" aria-label="Основная навигация">
          <LoginButton onClick={onLoginClick} />
        </nav>
      </div>
    </header>
  )
}