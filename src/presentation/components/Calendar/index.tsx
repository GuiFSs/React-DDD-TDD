import React, { useMemo } from 'react'

import Styles from './styles.scss'

interface Props {
  date: Date
  className?: string
}

const Calendar: React.FC<Props> = ({ date, className }: Props) => {
  const { day, month, year } = useMemo(() => {
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleString('pt-BR', { month: 'short' }).replace('.', ''),
      year: date.getFullYear()
    }
  }, [date])

  return (
    <time className={[Styles.calendarWrap, className].join(' ')} >
      <span data-testid="day" className={Styles.day}>
        {day}
      </span>
      <span data-testid="month" className={Styles.month}>
        {month}
      </span>
      <span data-testid="year" className={Styles.year}>
        {year}
      </span>
    </time>
  )
}

export default Calendar
