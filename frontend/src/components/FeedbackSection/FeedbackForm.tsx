import { useState } from 'react'
import './FeedbackForm.css'

interface FeedbackFormProps {
  onSubmit?: (data: FeedbackFormData) => void
}

interface FeedbackFormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validate = (data: FeedbackFormData): FormErrors => {
    const newErrors: FormErrors = {}
    if (!data.name.trim()) {
      newErrors.name = 'Имя обязательно'
    }
    if (!data.email.trim()) {
      newErrors.email = 'Email обязателен'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Некорректный email'
    }
    if (!data.message.trim()) {
      newErrors.message = 'Сообщение обязательно'
    } else if (data.message.trim().length < 10) {
      newErrors.message = 'Сообщение должно содержать минимум 10 символов'
    }
    return newErrors
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validate(formData)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputStyle = {
    width: '100%',
    height: '56px',
    backgroundColor: '#F7F8FA',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '20px',
    padding: '0 20px',
    fontFamily: 'Segoe UI Emoji',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '17.12px',
    color: '#111827',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const textareaStyle = {
    ...inputStyle,
    height: '160px',
    padding: '16px 20px',
    resize: 'none',
    lineHeight: '1.5',
  }

  const labelStyle = {
    fontFamily: 'Segoe UI Emoji',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '17.12px',
    color: '#999999',
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit} noValidate style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '28.5px' }}>
      <div className="feedback-form__field" style={{ width: '100%' }}>
        <label htmlFor="name" className="feedback-form__label" style={labelStyle}>
          Имя
        </label>
        <input
          type="text"
          id="name"
          name="name"
          style={{
            ...inputStyle,
            borderColor: errors.name ? '#EF4444' : 'rgba(0, 0, 0, 0.1)',
          }}
          value={formData.name}
          onChange={handleChange}
          placeholder="Ваше имя"
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.name && (
          <span id="name-error" className="feedback-form__error" role="alert" style={{ color: '#EF4444', fontSize: '14px', marginTop: '4px' }}>
            {errors.name}
          </span>
        )}
      </div>

      <div className="feedback-form__field" style={{ width: '100%' }}>
        <label htmlFor="email" className="feedback-form__label" style={labelStyle}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          style={{
            ...inputStyle,
            borderColor: errors.email ? '#EF4444' : 'rgba(0, 0, 0, 0.1)',
          }}
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.email && (
          <span id="email-error" className="feedback-form__error" role="alert" style={{ color: '#EF4444', fontSize: '14px', marginTop: '4px' }}>
            {errors.email}
          </span>
        )}
      </div>

      <div className="feedback-form__field" style={{ width: '100%' }}>
        <label htmlFor="message" className="feedback-form__label" style={labelStyle}>
          Сообщение
        </label>
        <textarea
          id="message"
          name="message"
          style={{
            ...textareaStyle,
            borderColor: errors.message ? '#EF4444' : 'rgba(0, 0, 0, 0.1)',
          }}
          value={formData.message}
          onChange={handleChange}
          placeholder="Ваше сообщение..."
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : 'message-hint'}
          disabled={isSubmitting}
        />
        {errors.message ? (
          <span id="message-error" className="feedback-form__error" role="alert" style={{ color: '#EF4444', fontSize: '14px', marginTop: '4px' }}>
            {errors.message}
          </span>
        ) : (
          <span id="message-hint" className="feedback-form__hint" style={{ color: '#999999', fontSize: '14px', marginTop: '4px' }}>
            Минимум 10 символов
          </span>
        )}
      </div>

      <div className="feedback-form__submit-wrapper" style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
        <button
          type="submit"
          className="feedback-form__submit"
          disabled={isSubmitting}
          style={{
            width: '150px',
            height: '56px',
            backgroundColor: '#111827',
            border: 'none',
            borderRadius: '20px',
            padding: '16px 32px',
            fontFamily: 'Segoe UI Emoji',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
            color: '#FFFFFF',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          {isSubmitting ? 'Отправка...' : 'Отправить'}
        </button>
      </div>

      {submitStatus === 'success' && (
        <div className="feedback-form__success" role="status" aria-live="polite" style={{ color: '#10B981', fontSize: '16px', marginTop: '16px' }}>
          Спасибо! Ваше сообщение отправлено.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="feedback-form__error-message" role="alert" style={{ color: '#EF4444', fontSize: '16px', marginTop: '16px' }}>
          Произошла ошибка. Попробуйте позже.
        </div>
      )}
    </form>
  )
}