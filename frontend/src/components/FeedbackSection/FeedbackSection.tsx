import { FeedbackForm } from './FeedbackForm'
import { ActionBar } from './ActionBar'
import './FeedbackSection.css'

export function FeedbackSection() {
  const handleFeedbackSubmit = async (data: { name: string; email: string; message: string }) => {
    // TODO: Connect to actual API endpoint
    console.log('Feedback submitted:', data)
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return (
    <section className="feedback-section" aria-labelledby="feedback-title">
      <div className="feedback-section__container">
        <header className="feedback-section__header">
          <h2 id="feedback-title" className="feedback-section__title">
            Остались вопросы?
          </h2>
          <p className="feedback-section__description">
            Напишите нам — мы ответим в течение 24 часов
          </p>
        </header>
        <FeedbackForm onSubmit={handleFeedbackSubmit} />
        <ActionBar
          primaryLabel="Начать планирование"
          secondaryLabel="Узнать больше"
          onPrimaryClick={() => console.log('Primary action clicked')}
          onSecondaryClick={() => console.log('Secondary action clicked')}
        />
      </div>
    </section>
  )
}