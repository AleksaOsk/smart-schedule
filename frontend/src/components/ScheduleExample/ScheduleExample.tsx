import { DayPreviewCard, DAYS_DATA } from './DayPreviewCard'
import './ScheduleExample.css'

export function ScheduleExample() {
  return (
    <section className="schedule-example" aria-labelledby="schedule-example-title">
      <header className="schedule-example__header">
        <h2 id="schedule-example-title" className="schedule-example__title">
          Пример расписания на неделю
        </h2>
        <p className="schedule-example__description">
          Это пример того, как может выглядеть ваше расписание. После входа вы сможете создать своё.
        </p>
      </header>
      <div className="schedule-example__cards" data-testid="schedule-cards-container">
        {DAYS_DATA.map(({ day, dayShort, isWeekend, hasTasks, taskCount }) => (
          <DayPreviewCard
            key={day}
            day={day}
            dayShort={dayShort}
            isWeekend={isWeekend}
            hasTasks={hasTasks}
            taskCount={taskCount}
          />
        ))}
      </div>
    </section>
  )
}