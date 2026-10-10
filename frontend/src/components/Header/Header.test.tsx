import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from './Header'
import { LoginButton } from './LoginButton'
import { Logo } from './Logo'

describe('Logo', () => {
  it('renders with default size', () => {
    render(<Logo />)
    const svg = screen.getByRole('img', { name: 'SmartSchedule' })
    expect(svg).toHaveAttribute('width', '40')
    expect(svg).toHaveAttribute('height', '40')
  })

  it('renders with custom size', () => {
    render(<Logo size={60} ariaLabel="Custom logo" />)
    const svg = screen.getByRole('img', { name: 'Custom logo' })
    expect(svg).toHaveAttribute('width', '60')
    expect(svg).toHaveAttribute('height', '60')
  })

  it('renders with custom ariaLabel from Header', () => {
    render(<Logo ariaLabel="SmartSchedule — умное планирование" />)
    const svg = screen.getByRole('img', { name: 'SmartSchedule — умное планирование' })
    expect(svg).toBeInTheDocument()
  })

  it('contains the correct SVG structure (3 paths)', () => {
    render(<Logo />)
    const svg = screen.getByRole('img')
    expect(svg).toBeInTheDocument()
    const paths = svg.querySelectorAll('path')
    expect(paths).toHaveLength(3)
  })
})

describe('LoginButton', () => {
  it('renders with "Войти" text', () => {
    render(<LoginButton />)
    const button = screen.getByRole('button', { name: /войти/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Войти')
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<LoginButton onClick={handleClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(<LoginButton onClick={handleClick} disabled />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies disabled state correctly', () => {
    render(<LoginButton disabled />)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('has correct aria-label', () => {
    render(<LoginButton />)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Войти в систему')
  })
})

describe('Header', () => {
  it('renders logo and login button', () => {
    render(<Header />)
    expect(screen.getByRole('img', { name: 'SmartSchedule — умное планирование' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /войти/i })).toBeInTheDocument()
  })

  it('calls onLoginClick when login button is clicked', () => {
    const handleLogin = vi.fn()
    render(<Header onLoginClick={handleLogin} />)
    fireEvent.click(screen.getByRole('button', { name: /войти/i }))
    expect(handleLogin).toHaveBeenCalledTimes(1)
  })

  it('has correct semantic structure', () => {
    render(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
    const nav = screen.getByRole('navigation', { name: 'Основная навигация' })
    expect(nav).toBeInTheDocument()
  })

  it('passes onLoginClick to LoginButton', () => {
    const handleLogin = vi.fn()
    render(<Header onLoginClick={handleLogin} />)
    const loginButton = screen.getByRole('button', { name: /войти/i })
    fireEvent.click(loginButton)
    expect(handleLogin).toHaveBeenCalledTimes(1)
  })
})