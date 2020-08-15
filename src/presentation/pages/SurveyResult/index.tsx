import React, { useState, useEffect } from 'react'
import FlipMove from 'react-flip-move'
import Header from '@/presentation/components/Header'
import Footer from '@/presentation/components/Footer'
import Styles from './styles.scss'
import Loading from '@/presentation/components/Loading'
import Calendar from '@/presentation/components/Calendar'
import { LoadSurveyResult } from '@/domain/usecases'
import Error from '@/presentation/components/Error'
import { useErrorHandler } from '@/presentation/hooks'

interface Props {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const handleError = useErrorHandler(({ message }) => {
    setError(message)
    setSurveyResult(null)
  })

  const [isLoading] = useState(false)
  const [error, setError] = useState('')
  const [surveyResult, setSurveyResult] = useState<LoadSurveyResult.Model>(null)
  const [shouldReload, setshouldReload] = useState(false)

  useEffect(() => {
    loadSurveyResult.load()
      .then(setSurveyResult)
      .catch(handleError)
  }, [shouldReload])

  const reload = (): void => {
    setshouldReload(prevReload => !prevReload)
    setError('')
  }

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
              {surveyResult.answers.map(({ answer, image, percent, isCurrentAccountAnswer }, i) => (
                <li
                  data-testid="answer-wrap"
                  key={`${answer}-${i}`}
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
        {error && <Error error={error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
