import './Hero.css'

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__container">
        <h1 id="hero-title" className="hero__title">
          Планировщик повторяющихся задач.
        </h1>
        <p className="hero__description">
          SmartSchedule автоматически собирает рабочее расписание, распределяет регулярные задачи и помогает ничего не забыть.
        </p>
      </div>
    </section>
  )
}