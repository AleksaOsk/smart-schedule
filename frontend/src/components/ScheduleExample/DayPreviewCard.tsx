import './DayPreviewCard.css'

interface DayPreviewCardProps {
  day: string
  dayShort: string
  isWeekend?: boolean
  hasTasks?: boolean
  taskCount?: number
}

export function DayPreviewCard({
  day,
  dayShort,
  isWeekend = false,
  hasTasks = true,
  taskCount = 3,
}: DayPreviewCardProps) {
  return (
    <article className={`day-preview-card ${isWeekend ? 'day-preview-card--weekend' : ''}`}>
      <header className="day-preview-card__header">
        <span className="day-preview-card__day-short">{dayShort}</span>
        <span className="day-preview-card__day-full">{day}</span>
      </header>
      <div className="day-preview-card__tasks" role="list" aria-label={`Задачи на ${day}`}>
        {hasTasks ? (
          Array.from({ length: Math.min(taskCount, 3) }, (_, i) => (
            <div key={i} className="day-preview-card__task" role="listitem">
              <span className="day-preview-card__task-indicator" aria-hidden="true" />
              <span className="day-preview-card__task-text">Задача {i + 1}</span>
            </div>
          ))
        ) : (
          <div className="day-preview-card__empty" role="listitem">
            <span className="day-preview-card__empty-text">Нет задач</span>
          </div>
        )}
        {taskCount > 3 && (
          <div className="day-preview-card__more" role="listitem">
            <span className="day-preview-card__more-text">+{taskCount - 3} ещё</span>
          </div>
        )}
      </div>
    </article>
  )
}

export const DAYS_DATA = [
  { day: 'Понедельник', dayShort: 'Пн', isWeekend: false, hasTasks: true, taskCount: 4 },
  { day: 'Вторник', dayShort: 'Вт', isWeekend: false, hasTasks: true, taskCount: 3 },
  { day: 'Среда', dayShort: 'Ср', isWeekend: false, hasTasks: true, taskCount: 5 },
  { day: 'Четверг', dayShort: 'Чт', isWeekend: false, hasTasks: true, taskCount: 2 },
  { day: 'Пятница', dayShort: 'Пт', isWeekend: false, hasTasks: true, taskCount: 3 },
  { day: 'Суббота', dayShort: 'Сб', isWeekend: true, hasTasks: false, taskCount: 0 },
  { day: 'Воскресенье', dayShort: 'Вс', isWeekend: true, hasTasks: false, taskCount: 0 },
] as const