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
  const [surveyResult, setSurveyResult] = useState<LoadSurveyResult.Model>(null)

  useEffect(() => {
    loadSurveyResult.load()
      .then(setSurveyResult)
      .catch()
  }, [])

  return (
    <div className={Styles.surveyResultWrap} >
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {surveyResult && (
          <>
            <hgroup>
              <Calendar
                date={surveyResult.date} className={Styles.calendarWrap}
              />
              <h2 data-testid="question">
                {surveyResult.question}
              </h2>
            </hgroup>
            <FlipMove data-testid="answers" className={Styles.answersList}>
              {surveyResult.answers.map(({ answer, image, percent, isCurrentAccountAnswer }) => (
                <li
                  data-testid="answer-wrap"
                  key={answer}
                  className={isCurrentAccountAnswer ? Styles.active : ''}
                >
                  {image && (
                    <img data-testid="image" src={image} alt={answer} />
                  )}
                  <span data-testid="answer" className={Styles.answer}>
                    {answer}
                  </span>
                  <span data-testid="percent" className={Styles.percent}>
                    {percent}%
                  </span>
                </li>
              ))}
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
