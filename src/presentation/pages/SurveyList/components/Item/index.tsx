import React, { useMemo } from 'react'
import Styles from './styles.scss'
import Icon, { IconName } from '@/presentation/components/Icon'
import { LoadSurveyList } from '@/domain/usecases'

interface Props {
  survey: LoadSurveyList.Model
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const { day, month, year,iconName } = useMemo(() => {
    const { date,didAnswer } = survey
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleString('pt-BR', { month: 'short' }).replace('.', ''),
      year: date.getFullYear(),
      iconName: didAnswer ? IconName.thumbUp : IconName.thumbDown
    }
  }, [survey])

  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent} >
        <Icon
          iconName={iconName}
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
