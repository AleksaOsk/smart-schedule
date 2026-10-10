import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { FeedbackForm } from './FeedbackForm'
import { ActionBar } from './ActionBar'

describe('FeedbackForm', () => {
  const defaultProps = {
    onSubmit: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all form fields', () => {
    render(<FeedbackForm {...defaultProps} />)
    expect(screen.getByLabelText(/имя \*/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email \*/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/сообщение \*/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /отправить/i })).toBeInTheDocument()
  })

  it('shows validation errors when submitting empty form', async () => {
    render(<FeedbackForm {...defaultProps} />)
    fireEvent.click(screen.getByRole('button', { name: /отправить/i }))
    await waitFor(() => {
      expect(screen.getByText('Имя обязательно')).toBeInTheDocument()
      expect(screen.getByText('Email обязателен')).toBeInTheDocument()
      expect(screen.getByText('Сообщение обязательно')).toBeInTheDocument()
    })
    expect(defaultProps.onSubmit).not.toHaveBeenCalled()
  })

  it('shows error for invalid email format', async () => {
    render(<FeedbackForm {...defaultProps} />)
    fireEvent.change(screen.getByLabelText(/email \*/i), { target: { name: 'email', value: 'invalid-email' } })
    fireEvent.click(screen.getByRole('button', { name: /отправить/i }))
    await waitFor(() => {
      expect(screen.getByText('Некорректный email')).toBeInTheDocument()
    })
  })

  it('shows error for short message', async () => {
    render(<FeedbackForm {...defaultProps} />)
    fireEvent.change(screen.getByLabelText(/имя \*/i), { target: { name: 'name', value: 'Test User' } })
    fireEvent.change(screen.getByLabelText(/email \*/i), { target: { name: 'email', value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/сообщение \*/i), { target: { name: 'message', value: 'Short' } })
    fireEvent.click(screen.getByRole('button', { name: /отправить/i }))
    await waitFor(() => {
      expect(screen.getByText('Сообщение должно содержать минимум 10 символов')).toBeInTheDocument()
    })
  })

  it('calls onSubmit with form data when valid', async () => {
    render(<FeedbackForm {...defaultProps} />)
    fireEvent.change(screen.getByLabelText(/имя \*/i), { target: { name: 'name', value: 'Test User' } })
    fireEvent.change(screen.getByLabelText(/email \*/i), { target: { name: 'email', value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/сообщение \*/i), { target: { name: 'message', value: 'This is a valid message' } })
    fireEvent.click(screen.getByRole('button', { name: /отправить/i }))
    await waitFor(() => {
      expect(defaultProps.onSubmit).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a valid message',
      })
    })
  })

  it('shows success message after successful submission', async () => {
    render(<FeedbackForm {...defaultProps} />)
    fireEvent.change(screen.getByLabelText(/имя \*/i), { target: { name: 'name', value: 'Test User' } })
    fireEvent.change(screen.getByLabelText(/email \*/i), { target: { name: 'email', value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/сообщение \*/i), { target: { name: 'message', value: 'This is a valid message' } })
    fireEvent.click(screen.getByRole('button', { name: /отправить/i }))
    await waitFor(() => {
      expect(screen.getByText('Спасибо! Ваше сообщение отправлено.')).toBeInTheDocument()
    })
  })

  it('clears form after successful submission', async () => {
    render(<FeedbackForm {...defaultProps} />)
    fireEvent.change(screen.getByLabelText(/имя \*/i), { target: { name: 'name', value: 'Test User' } })
    fireEvent.change(screen.getByLabelText(/email \*/i), { target: { name: 'email', value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/сообщение \*/i), { target: { name: 'message', value: 'This is a valid message' } })
    fireEvent.click(screen.getByRole('button', { name: /отправить/i }))
    await waitFor(() => {
      expect(screen.getByLabelText(/имя \*/i)).toHaveValue('')
      expect(screen.getByLabelText(/email \*/i)).toHaveValue('')
      expect(screen.getByLabelText(/сообщение \*/i)).toHaveValue('')
    })
  })

  it('shows error message when onSubmit throws', async () => {
    const failingSubmit = vi.fn().mockRejectedValue(new Error('API error'))
    render(<FeedbackForm onSubmit={failingSubmit} />)
    fireEvent.change(screen.getByLabelText(/имя \*/i), { target: { name: 'name', value: 'Test User' } })
    fireEvent.change(screen.getByLabelText(/email \*/i), { target: { name: 'email', value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/сообщение \*/i), { target: { name: 'message', value: 'This is a valid message' } })
    fireEvent.click(screen.getByRole('button', { name: /отправить/i }))
    await waitFor(() => {
      expect(screen.getByText('Произошла ошибка. Попробуйте позже.')).toBeInTheDocument()
    })
  })

  it('disables form during submission', async () => {
    let resolveSubmit: (value: void) => void
    const pendingSubmit = vi.fn(() => new Promise<void>((resolve) => { resolveSubmit = resolve }))
    render(<FeedbackForm onSubmit={pendingSubmit} />)
    fireEvent.change(screen.getByLabelText(/имя \*/i), { target: { name: 'name', value: 'Test User' } })
    fireEvent.change(screen.getByLabelText(/email \*/i), { target: { name: 'email', value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/сообщение \*/i), { target: { name: 'message', value: 'This is a valid message' } })
    fireEvent.click(screen.getByRole('button', { name: /отправить/i }))
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /отправка/i })).toBeDisabled()
      expect(screen.getByLabelText(/имя \*/i)).toBeDisabled()
      expect(screen.getByLabelText(/email \*/i)).toBeDisabled()
      expect(screen.getByLabelText(/сообщение \*/i)).toBeDisabled()
    })
    resolveSubmit!()
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /отправить/i })).not.toBeDisabled()
    })
  })

  it('clears error when user starts typing', async () => {
    render(<FeedbackForm {...defaultProps} />)
    fireEvent.click(screen.getByRole('button', { name: /отправить/i }))
    await waitFor(() => {
      expect(screen.getByText('Имя обязательно')).toBeInTheDocument()
    })
    fireEvent.change(screen.getByLabelText(/имя \*/i), { target: { name: 'name', value: 'T' } })
    await waitFor(() => {
      expect(screen.queryByText('Имя обязательно')).not.toBeInTheDocument()
    })
  })
})

describe('ActionBar', () => {
  it('renders both buttons with default labels', () => {
    render(<ActionBar />)
    expect(screen.getByRole('button', { name: /начать планирование/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /узнать больше/i })).toBeInTheDocument()
  })

  it('renders custom labels', () => {
    render(<ActionBar primaryLabel="Custom Primary" secondaryLabel="Custom Secondary" />)
    expect(screen.getByRole('button', { name: /custom primary/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /custom secondary/i })).toBeInTheDocument()
  })

  it('calls onPrimaryClick when primary button clicked', () => {
    const handlePrimary = vi.fn()
    const handleSecondary = vi.fn()
    render(<ActionBar onPrimaryClick={handlePrimary} onSecondaryClick={handleSecondary} />)
    fireEvent.click(screen.getByRole('button', { name: /начать планирование/i }))
    expect(handlePrimary).toHaveBeenCalledTimes(1)
    expect(handleSecondary).not.toHaveBeenCalled()
  })

  it('calls onSecondaryClick when secondary button clicked', () => {
    const handlePrimary = vi.fn()
    const handleSecondary = vi.fn()
    render(<ActionBar onPrimaryClick={handlePrimary} onSecondaryClick={handleSecondary} />)
    fireEvent.click(screen.getByRole('button', { name: /узнать больше/i }))
    expect(handleSecondary).toHaveBeenCalledTimes(1)
    expect(handlePrimary).not.toHaveBeenCalled()
  })

  it('disables primary button when primaryDisabled is true', () => {
    render(<ActionBar primaryDisabled />)
    expect(screen.getByRole('button', { name: /начать планирование/i })).toBeDisabled()
  })

  it('disables secondary button when secondaryDisabled is true', () => {
    render(<ActionBar secondaryDisabled />)
    expect(screen.getByRole('button', { name: /узнать больше/i })).toBeDisabled()
  })

  it('does not call onClick when button is disabled', () => {
    const handlePrimary = vi.fn()
    render(<ActionBar onPrimaryClick={handlePrimary} primaryDisabled />)
    fireEvent.click(screen.getByRole('button', { name: /начать планирование/i }))
    expect(handlePrimary).not.toHaveBeenCalled()
  })

  it('has correct semantic structure', () => {
    render(<ActionBar />)
    const group = screen.getByRole('group', { name: 'Основные действия' })
    expect(group).toBeInTheDocument()
  })

  it('applies correct CSS classes to buttons', () => {
    const { container } = render(<ActionBar />)
    const primaryButton = container.querySelector('.action-bar__button--primary')
    const secondaryButton = container.querySelector('.action-bar__button--secondary')
    expect(primaryButton).toBeInTheDocument()
    expect(secondaryButton).toBeInTheDocument()
  })
})