import { FeedbackForm } from './FeedbackForm'
import './FeedbackSection.css'

export function FeedbackSection() {
  const handleFeedbackSubmit = async (data: { name: string; email: string; message: string }) => {
    console.log('Feedback submitted:', data)
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return (
    <section className="feedback-section" aria-labelledby="feedback-title">
      <div className="feedback-section__container">
        <header className="feedback-section__header">
          <h2 id="feedback-title" className="feedback-section__title">
            Обратная связь
          </h2>
          <p className="feedback-section__description">
            Есть предложения или идеи? Напишите нам.
          </p>
        </header>
        <div className="feedback-section__form-wrapper">
          <FeedbackForm onSubmit={handleFeedbackSubmit} />
        </div>
      </div>
    </section>
  )
}