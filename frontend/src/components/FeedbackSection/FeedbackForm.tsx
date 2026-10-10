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
        // Simulate API call
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

  return (
    <form className="feedback-form" onSubmit={handleSubmit} noValidate>
      <div className="feedback-form__field">
        <label htmlFor="name" className="feedback-form__label">
          Имя <span className="feedback-form__required" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={`feedback-form__input ${errors.name ? 'feedback-form__input--error' : ''}`}
          value={formData.name}
          onChange={handleChange}
          placeholder="Ваше имя"
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.name && (
          <span id="name-error" className="feedback-form__error" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className="feedback-form__field">
        <label htmlFor="email" className="feedback-form__label">
          Email <span className="feedback-form__required" aria-hidden="true">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={`feedback-form__input ${errors.email ? 'feedback-form__input--error' : ''}`}
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.email && (
          <span id="email-error" className="feedback-form__error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className="feedback-form__field">
        <label htmlFor="message" className="feedback-form__label">
          Сообщение <span className="feedback-form__required" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          className={`feedback-form__textarea ${errors.message ? 'feedback-form__textarea--error' : ''}`}
          value={formData.message}
          onChange={handleChange}
          placeholder="Ваше сообщение..."
          rows={5}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : 'message-hint'}
          disabled={isSubmitting}
        />
        {errors.message ? (
          <span id="message-error" className="feedback-form__error" role="alert">
            {errors.message}
          </span>
        ) : (
          <span id="message-hint" className="feedback-form__hint">
            Минимум 10 символов
          </span>
        )}
      </div>

      <div className="feedback-form__submit-wrapper">
        <button
          type="submit"
          className="feedback-form__submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Отправка...' : 'Отправить'}
        </button>
      </div>

      {submitStatus === 'success' && (
        <div className="feedback-form__success" role="status" aria-live="polite">
          Спасибо! Ваше сообщение отправлено.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="feedback-form__error-message" role="alert">
          Произошла ошибка. Попробуйте позже.
        </div>
      )}
    </form>
  )
}