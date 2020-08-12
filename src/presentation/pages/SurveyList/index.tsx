import React, { useEffect, useState } from 'react'
import Styles from './styles.scss'
import Footer from '@/presentation/components/Footer'
import Header from '@/presentation/components/Header'
import { SurveyItemEmpty, SurveyItem } from './components'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'

interface Props {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [surveys, setSurveys] = useState<SurveyModel[]>([])

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(setSurveys)
  }, [])

  return (
    <div className={Styles.surveyWrap} >
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          {surveys.length ? surveys.map(survey => (
            <SurveyItem
              key={survey.id}
              survey={survey}
            />
          )) : (
            <SurveyItemEmpty />
          )}
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
