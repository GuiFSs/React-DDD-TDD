import React, { useContext } from 'react'
import SurveyContext from '@/presentation/pages/SurveyList/context/context'
import { SurveyItem, SurveyItemEmpty } from '..'
import Styles from './styles.scss'
import { LoadSurveyList } from '@/domain/usecases'

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)
  return (
    <ul data-testid="survey-list" className={Styles.listWrap}>
      {state.surveys.length ? state.surveys.map((survey: LoadSurveyList.Model) => (
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
