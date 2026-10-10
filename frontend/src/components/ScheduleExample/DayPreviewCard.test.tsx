import { render, screen } from '@testing-library/react'
import { DayPreviewCard, DAYS_DATA } from './DayPreviewCard'
import { ScheduleExample } from './ScheduleExample'

describe('DayPreviewCard', () => {
  const defaultProps = {
    day: 'Понедельник',
    dayShort: 'Пн',
    isWeekend: false,
    hasTasks: true,
    taskCount: 3,
  }

  it('renders day names correctly', () => {
    render(<DayPreviewCard {...defaultProps} />)
    expect(screen.getByText('Пн')).toBeInTheDocument()
    expect(screen.getByText('Понедельник')).toBeInTheDocument()
  })

  it('renders tasks when hasTasks is true', () => {
    render(<DayPreviewCard {...defaultProps} taskCount={3} />)
    expect(screen.getByText('Задача 1')).toBeInTheDocument()
    expect(screen.getByText('Задача 2')).toBeInTheDocument()
    expect(screen.getByText('Задача 3')).toBeInTheDocument()
  })

  it('renders empty state when hasTasks is false', () => {
    render(<DayPreviewCard {...defaultProps} hasTasks={false} taskCount={0} />)
    expect(screen.getByText('Нет задач')).toBeInTheDocument()
  })

  it('shows "+N ещё" when taskCount > 3', () => {
    render(<DayPreviewCard {...defaultProps} taskCount={5} />)
    expect(screen.getByText('+2 ещё')).toBeInTheDocument()
  })

  it('applies weekend class when isWeekend is true', () => {
    const { container } = render(<DayPreviewCard {...defaultProps} isWeekend />)
    const card = container.querySelector('article')
    expect(card).toHaveClass('day-preview-card--weekend')
  })

  it('does not apply weekend class when isWeekend is false', () => {
    const { container } = render(<DayPreviewCard {...defaultProps} isWeekend={false} />)
    const card = container.querySelector('article')
    expect(card).not.toHaveClass('day-preview-card--weekend')
  })

  it('has correct role and accessibility attributes', () => {
    render(<DayPreviewCard {...defaultProps} />)
    const card = screen.getByRole('article')
    expect(card).toBeInTheDocument()
    const taskList = screen.getByRole('list', { name: 'Задачи на Понедельник' })
    expect(taskList).toBeInTheDocument()
  })

  it('limits displayed tasks to 3', () => {
    render(<DayPreviewCard {...defaultProps} taskCount={10} />)
    const taskItems = screen.getAllByRole('listitem')
    expect(taskItems).toHaveLength(4) // 3 tasks + 1 "more" item
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

  it('has task counts for weekdays', () => {
    for (let i = 0; i < 5; i++) {
      expect(DAYS_DATA[i].hasTasks).toBe(true)
      expect(DAYS_DATA[i].taskCount).toBeGreaterThan(0)
    }
  })

  it('has no tasks for weekend', () => {
    expect(DAYS_DATA[5].hasTasks).toBe(false)
    expect(DAYS_DATA[6].hasTasks).toBe(false)
  })
})

describe('ScheduleExample', () => {
  it('renders section with title', () => {
    render(<ScheduleExample />)
    expect(screen.getByRole('heading', { name: 'Пример расписания на неделю' })).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<ScheduleExample />)
    expect(screen.getByText('Это пример того, как может выглядеть ваше расписание. После входа вы сможете создать своё.')).toBeInTheDocument()
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
    const section = screen.getByRole('region', { name: 'Пример расписания на неделю' })
    expect(section).toBeInTheDocument()
    // Контейнер карточек не должен иметь role="list" - это просто обёртка для карточек
    const cardsContainer = screen.getByTestId('schedule-cards-container')
    expect(cardsContainer).toBeInTheDocument()
  })

  it('applies scroll snap to cards container', () => {
    const { container } = render(<ScheduleExample />)
    const cardsContainer = container.querySelector('.schedule-example__cards')
    expect(cardsContainer).toHaveStyle({ scrollSnapType: 'x mandatory' })
  })
})