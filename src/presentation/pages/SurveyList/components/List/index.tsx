import React, { useContext } from 'react'
import SurveyContext from '@/presentation/pages/SurveyList/context/context'
import { SurveyItem, SurveyItemEmpty } from '..'
import { SurveyModel } from '@/domain/models'
import Styles from './styles.scss'

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)
  return (
    <ul data-testid="survey-list" className={Styles.listWrap}>
      {state.surveys.length ? state.surveys.map((survey: SurveyModel) => (
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
