import React, { useMemo } from 'react'
import Styles from './styles.scss'
import Icon, { IconName } from '@/presentation/components/Icon'
import { LoadSurveyList } from '@/domain/usecases'
import Calendar from '@/presentation/components/Calendar'
import { Link } from 'react-router-dom'

interface Props {
  survey: LoadSurveyList.Model
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const { iconName, surveyDate } = useMemo(() => {
    const { date,didAnswer } = survey
    return {
      iconName: didAnswer ? IconName.thumbUp : IconName.thumbDown,
      surveyDate: date
    }
  }, [survey])

  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent} >
        <Icon
          iconName={iconName}
          className={Styles.iconWrap}
        />
        <Calendar
          className={Styles.calendarWrap}
          date={surveyDate}
        />
        <p data-testid="question">
          {survey.question}
        </p>
      </div>
      <footer>
        <Link
          data-testid="link"
          to={`/surveys/${survey.id}`}
        >
          Ver Resultado
        </Link>
      </footer>
    </li>
  )
}

export default SurveyItem
