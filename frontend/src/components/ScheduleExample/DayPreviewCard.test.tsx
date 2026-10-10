import { render, screen } from '@testing-library/react'
import { DayPreviewCard, DAYS_DATA } from './DayPreviewCard'
import { ScheduleExample } from './ScheduleExample'
import { Hero } from './Hero'

describe('DayPreviewCard', () => {
  it('renders day short name correctly', () => {
    render(<DayPreviewCard day="Понедельник" dayShort="Пн" />)
    expect(screen.getByText('Пн')).toBeInTheDocument()
  })

  it('renders time when provided', () => {
    render(<DayPreviewCard day="Понедельник" dayShort="Пн" time="09:00" />)
    expect(screen.getByText('09:00')).toBeInTheDocument()
  })

  it('renders title and description when provided', () => {
    render(<DayPreviewCard
      day="Понедельник"
      dayShort="Пн"
      title="Оплатить сервер"
      description="Ежемесячная оплата инфраструктуры"
    />)
    expect(screen.getByText('Оплатить сервер')).toBeInTheDocument()
    expect(screen.getByText('Ежемесячная оплата инфраструктуры')).toBeInTheDocument()
  })

  it('renders empty state for weekday without task data', () => {
    render(<DayPreviewCard day="Понедельник" dayShort="Пн" />)
    expect(screen.getByText('Нет задач')).toBeInTheDocument()
  })

  it('does not render empty state for weekend (Figma shows empty cards)', () => {
    render(<DayPreviewCard day="Суббота" dayShort="Сб" isWeekend />)
    expect(screen.queryByText('Нет задач')).not.toBeInTheDocument()
  })

  it('applies weekend class when isWeekend is true', () => {
    const { container } = render(<DayPreviewCard day="Суббота" dayShort="Сб" isWeekend />)
    const card = container.querySelector('article')
    expect(card).toHaveClass('day-preview-card--weekend')
  })

  it('does not apply weekend class when isWeekend is false', () => {
    const { container } = render(<DayPreviewCard day="Понедельник" dayShort="Пн" isWeekend={false} />)
    const card = container.querySelector('article')
    expect(card).not.toHaveClass('day-preview-card--weekend')
  })

  it('has correct role', () => {
    render(<DayPreviewCard day="Понедельник" dayShort="Пн" />)
    const card = screen.getByRole('article')
    expect(card).toBeInTheDocument()
  })
})

describe('DAYS_DATA', () => {
  it('contains 7 days', () => {
    expect(DAYS_DATA).toHaveLength(7)
  })

  it('has correct day names in order', () => {
    const expectedDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
    expect(DAYS_DATA.map(d => d.day)).toEqual(expectedDays)
  })

  it('has correct short day names', () => {
    const expectedShort = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    expect(DAYS_DATA.map(d => d.dayShort)).toEqual(expectedShort)
  })

  it('marks weekend days correctly', () => {
    expect(DAYS_DATA[5].isWeekend).toBe(true) // Суббота
    expect(DAYS_DATA[6].isWeekend).toBe(true) // Воскресенье
    expect(DAYS_DATA[0].isWeekend).toBe(false) // Понедельник
  })

  it('has task data for weekdays', () => {
    for (let i = 0; i < 5; i++) {
      expect(DAYS_DATA[i].title).toBeDefined()
      expect(DAYS_DATA[i].description).toBeDefined()
      expect(DAYS_DATA[i].time).toBeDefined()
    }
  })

  it('has no task data for weekend', () => {
    expect(DAYS_DATA[5].title).toBeUndefined()
    expect(DAYS_DATA[6].title).toBeUndefined()
  })

  it('has correct task data for Monday', () => {
    expect(DAYS_DATA[0].time).toBe('09:00')
    expect(DAYS_DATA[0].title).toBe('Оплатить сервер')
    expect(DAYS_DATA[0].description).toBe('Ежемесячная оплата инфраструктуры')
  })
})

describe('ScheduleExample', () => {
  it('renders Hero section', () => {
    render(<ScheduleExample />)
    expect(screen.getByText('Планировщик повторяющихся задач.')).toBeInTheDocument()
    expect(screen.getByText('SmartSchedule автоматически собирает рабочее расписание, распределяет регулярные задачи и помогает ничего не забыть.')).toBeInTheDocument()
  })

  it('renders 7 DayPreviewCard components', () => {
    render(<ScheduleExample />)
    const cards = screen.getAllByRole('article')
    expect(cards).toHaveLength(7)
  })

  it('renders days in correct order', () => {
    render(<ScheduleExample />)
    const dayShorts = screen.getAllByText(/^(Пн|Вт|Ср|Чт|Пт|Сб|Вс)$/)
    expect(dayShorts.map(el => el.textContent)).toEqual(['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'])
  })

  it('has correct semantic structure', () => {
    render(<ScheduleExample />)
    const cardsContainer = screen.getByTestId('schedule-cards-container')
    expect(cardsContainer).toBeInTheDocument()
  })

  it('applies scroll snap to cards container', () => {
    const { container } = render(<ScheduleExample />)
    const cardsContainer = container.querySelector('.schedule-example__cards')
    expect(cardsContainer).toHaveStyle({ scrollSnapType: 'x mandatory' })
  })
})

describe('Hero', () => {
  it('renders title and description', () => {
    render(<Hero />)
    expect(screen.getByText('Планировщик повторяющихся задач.')).toBeInTheDocument()
    expect(screen.getByText('SmartSchedule автоматически собирает рабочее расписание, распределяет регулярные задачи и помогает ничего не забыть.')).toBeInTheDocument()
  })

  it('has correct heading level', () => {
    render(<Hero />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Планировщик повторяющихся задач.')
  })
})