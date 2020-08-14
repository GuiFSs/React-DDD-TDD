import React from 'react'
import { SurveyItem, SurveyItemEmpty } from '..'
import Styles from './styles.scss'
import { LoadSurveyList } from '@/domain/usecases'

interface Props {
  surveys: LoadSurveyList.Model[]
}

const List: React.FC<Props> = ({ surveys }: Props) => {
  return (
    <ul data-testid="survey-list" className={Styles.listWrap}>
      {surveys.length ? surveys.map((survey: LoadSurveyList.Model) => (
        <SurveyItem
          key={survey.id}
          survey={survey}
        />
      )) : (
        <SurveyItemEmpty />
      )}
    </ul>
  )
}

export default List
