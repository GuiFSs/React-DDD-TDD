import React, { useEffect } from 'react'
import Styles from './styles.scss'
import Footer from '@/presentation/components/Footer'
import Header from '@/presentation/components/Header'
import { SurveyItemEmpty } from './components'
import { LoadSurveyList } from '@/domain/usecases'

interface Props {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  useEffect(() => {
    loadSurveyList.loadAll()
  }, [])
  return (
    <div className={Styles.surveyWrap} >
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          <SurveyItemEmpty />
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
