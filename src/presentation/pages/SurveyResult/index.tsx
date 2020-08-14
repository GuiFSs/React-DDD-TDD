import React, { useState, useEffect } from 'react'
import FlipMove from 'react-flip-move'
import Header from '@/presentation/components/Header'
import Footer from '@/presentation/components/Footer'
import Styles from './styles.scss'
import Loading from '@/presentation/components/Loading'
import Calendar from '@/presentation/components/Calendar'
import { LoadSurveyResult } from '@/domain/usecases'
import Error from '@/presentation/components/Error'

interface Props {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [isLoading] = useState(false)
  const [error] = useState('')
  const [surveyResult] = useState<LoadSurveyResult.Model>(null)

  useEffect(() => {
    loadSurveyResult.load()
      .then()
      .catch()
  })

  return (
    <div className={Styles.surveyResultWrap} >
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {surveyResult && (
          <>
            <hgroup>
              <Calendar
                date={new Date()} className={Styles.calendarWrap}
              />
              <h2>Qual seu framework favorito?</h2>
            </hgroup>
            <FlipMove className={Styles.answersList}>
              <li key="1" >
                <img src=""/>
                <span className={Styles.answer}>ReactJs</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li key="2" className={Styles.active} >
                <img src=""/>
                <span className={Styles.answer}>ReactJs</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li key="3">
                <img src=""/>
                <span className={Styles.answer}>ReactJs</span>
                <span className={Styles.percent}>50%</span>
              </li>
            </FlipMove>
            <button>Voltar</button>
          </>
        )}
        {isLoading && <Loading />}
        {error && <Error error={error} reload={() => {}} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
