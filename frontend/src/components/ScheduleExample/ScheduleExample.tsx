import { Hero } from './Hero'
import { DayPreviewCard, DAYS_DATA } from './DayPreviewCard'
import './ScheduleExample.css'

export function ScheduleExample() {
  return (
    <section className="schedule-example" aria-labelledby="schedule-example-title">
      <Hero />
      <div className="schedule-example__cards" data-testid="schedule-cards-container">
        {DAYS_DATA.map(({ day, dayShort, time, title, description, isWeekend }) => (
          <DayPreviewCard
            key={day}
            day={day}
            dayShort={dayShort}
            time={time}
            title={title}
            description={description}
            isWeekend={isWeekend}
          />
        ))}
      </div>
    </section>
  )
}