import './DayPreviewCard.css'

interface DayPreviewCardProps {
  day: string
  dayShort: string
  time?: string
  title?: string
  description?: string
  isWeekend?: boolean
}

export function DayPreviewCard({
  day: _day,
  dayShort,
  time,
  title,
  description,
  isWeekend = false,
}: DayPreviewCardProps) {
  return (
    <article className={`day-preview-card ${isWeekend ? 'day-preview-card--weekend' : ''}`}>
      <header className="day-preview-card__header">
        <span className="day-preview-card__day-short">{dayShort}</span>
        {time && <span className="day-preview-card__time">{time}</span>}
      </header>
      {title && (
        <div className="day-preview-card__content">
          <h3 className="day-preview-card__title">{title}</h3>
          {description && (
            <p className="day-preview-card__description">{description}</p>
          )}
        </div>
      )}
      {!title && !isWeekend && (
        <div className="day-preview-card__empty">
          <span className="day-preview-card__empty-text">Нет задач</span>
        </div>
      )}
    </article>
  )
}

export const DAYS_DATA = [
  {
    day: 'Понедельник',
    dayShort: 'Пн',
    time: '09:00',
    title: 'Оплатить сервер',
    description: 'Ежемесячная оплата инфраструктуры',
    isWeekend: false,
  },
  {
    day: 'Вторник',
    dayShort: 'Вт',
    time: '12:00',
    title: 'Созвон с командой',
    description: 'Еженедельный sync meeting',
    isWeekend: false,
  },
  {
    day: 'Среда',
    dayShort: 'Ср',
    time: '15:00',
    title: 'Проверить бэкапы',
    description: 'Автоматическая проверка раз в неделю',
    isWeekend: false,
  },
  {
    day: 'Четверг',
    dayShort: 'Чт',
    time: '10:00',
    title: 'Код-ревью',
    description: 'Ежедневная практика',
    isWeekend: false,
  },
  {
    day: 'Пятница',
    dayShort: 'Пт',
    time: '14:00',
    title: 'Планерка спринта',
    description: 'Двухнедельная встреча',
    isWeekend: false,
  },
  {
    day: 'Суббота',
    dayShort: 'Сб',
    isWeekend: true,
  },
  {
    day: 'Воскресенье',
    dayShort: 'Вс',
    isWeekend: true,
  },
] as const