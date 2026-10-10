import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { FeedbackForm } from './FeedbackForm'

describe('FeedbackForm', () => {
  const defaultProps = {
    onSubmit: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all form fields', () => {
    render(<FeedbackForm {...defaultProps} />)
    expect(screen.getByLabelText('Имя')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Сообщение')).toBeInTheDocument()
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
    fireEvent.change(screen.getByLabelText('Email'), { target: { name: 'email', value: 'invalid-email' } })
    fireEvent.click(screen.getByRole('button', { name: /отправить/i }))
    await waitFor(() => {
      expect(screen.getByText('Некорректный email')).toBeInTheDocument()
    })
  })

  it('shows error for short message', async () => {
    render(<FeedbackForm {...defaultProps} />)
    fireEvent.change(screen.getByLabelText('Имя'), { target: { name: 'name', value: 'Test User' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { name: 'email', value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText('Сообщение'), { target: { name: 'message', value: 'Short' } })
    fireEvent.click(screen.getByRole('button', { name: /отправить/i }))
    await waitFor(() => {
      expect(screen.getByText('Сообщение должно содержать минимум 10 символов')).toBeInTheDocument()
    })
  })

  it('calls onSubmit with form data when valid', async () => {
    render(<FeedbackForm {...defaultProps} />)
    fireEvent.change(screen.getByLabelText('Имя'), { target: { name: 'name', value: 'Test User' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { name: 'email', value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText('Сообщение'), { target: { name: 'message', value: 'This is a valid message' } })
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
    fireEvent.change(screen.getByLabelText('Имя'), { target: { name: 'name', value: 'Test User' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { name: 'email', value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText('Сообщение'), { target: { name: 'message', value: 'This is a valid message' } })
    fireEvent.click(screen.getByRole('button', { name: /отправить/i }))
    await waitFor(() => {
      expect(screen.getByText('Спасибо! Ваше сообщение отправлено.')).toBeInTheDocument()
    })
  })

  it('clears form after successful submission', async () => {
    render(<FeedbackForm {...defaultProps} />)
    fireEvent.change(screen.getByLabelText('Имя'), { target: { name: 'name', value: 'Test User' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { name: 'email', value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText('Сообщение'), { target: { name: 'message', value: 'This is a valid message' } })
    fireEvent.click(screen.getByRole('button', { name: /отправить/i }))
    await waitFor(() => {
      expect(screen.getByLabelText('Имя')).toHaveValue('')
      expect(screen.getByLabelText('Email')).toHaveValue('')
      expect(screen.getByLabelText('Сообщение')).toHaveValue('')
    })
  })

  it('shows error message when onSubmit throws', async () => {
    const failingSubmit = vi.fn().mockRejectedValue(new Error('API error'))
    render(<FeedbackForm onSubmit={failingSubmit} />)
    fireEvent.change(screen.getByLabelText('Имя'), { target: { name: 'name', value: 'Test User' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { name: 'email', value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText('Сообщение'), { target: { name: 'message', value: 'This is a valid message' } })
    fireEvent.click(screen.getByRole('button', { name: /отправить/i }))
    await waitFor(() => {
      expect(screen.getByText('Произошла ошибка. Попробуйте позже.')).toBeInTheDocument()
    })
  })

  it('disables form during submission', async () => {
    let resolveSubmit: (value: void) => void
    const pendingSubmit = vi.fn(() => new Promise<void>((resolve) => { resolveSubmit = resolve }))
    render(<FeedbackForm onSubmit={pendingSubmit} />)
    fireEvent.change(screen.getByLabelText('Имя'), { target: { name: 'name', value: 'Test User' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { name: 'email', value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText('Сообщение'), { target: { name: 'message', value: 'This is a valid message' } })
    fireEvent.click(screen.getByRole('button', { name: /отправить/i }))
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /отправка/i })).toBeDisabled()
      expect(screen.getByLabelText('Имя')).toBeDisabled()
      expect(screen.getByLabelText('Email')).toBeDisabled()
      expect(screen.getByLabelText('Сообщение')).toBeDisabled()
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
    fireEvent.change(screen.getByLabelText('Имя'), { target: { name: 'name', value: 'T' } })
    await waitFor(() => {
      expect(screen.queryByText('Имя обязательно')).not.toBeInTheDocument()
    })
  })

  it('has correct placeholder texts', () => {
    render(<FeedbackForm {...defaultProps} />)
    expect(screen.getByLabelText('Имя')).toHaveAttribute('placeholder', 'Ваше имя')
    expect(screen.getByLabelText('Email')).toHaveAttribute('placeholder', 'Email')
    expect(screen.getByLabelText('Сообщение')).toHaveAttribute('placeholder', 'Ваше сообщение...')
  })

  it('renders submit button with black background', () => {
    render(<FeedbackForm {...defaultProps} />)
    const button = screen.getByRole('button', { name: /отправить/i })
    expect(button).toHaveStyle({ backgroundColor: '#111827' })
    expect(button).toHaveStyle({ color: '#FFFFFF' })
  })
})