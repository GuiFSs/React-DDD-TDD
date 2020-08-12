import React, { useMemo } from 'react'
import Styles from './styles.scss'
import Icon, { IconName } from '@/presentation/components/Icon'
import { SurveyModel } from '@/domain/models'

interface Props {
  survey: SurveyModel
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const { day, month, year } = useMemo(() => {
    const { date } = survey
    return {
      day: date.getDate(),
      month: date.toLocaleString('pt-BR', { month: 'short' }).replace('.', ''),
      year: date.getFullYear()
    }
  }, [survey])

  return (
    <li>
      <div className={Styles.surveyItemWrap}>
        <Icon
          iconName={IconName.thumbUp}
          className={Styles.iconWrap}
        />
        <time>
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
        <p data-testid="question">
          {survey.question}
        </p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}

export default SurveyItem
