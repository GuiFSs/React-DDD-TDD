import React, { useState, useEffect } from 'react'
import Header from '@/presentation/components/Header'
import Footer from '@/presentation/components/Footer'
import Styles from './styles.scss'
import Loading from '@/presentation/components/Loading'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import Error from '@/presentation/components/Error'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResultData, SurveyResultContext } from './components'

interface Props {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult , saveSurveyResult }: Props) => {
  const handleError = useErrorHandler(({ message }) => {
    setError(message)
    setSurveyResult(null)
  })

  const [isLoading, setIsLoading] = useState(false)
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

  const onAnswer = (answer: string): void => {
    setIsLoading(true)
    saveSurveyResult.save({ answer })
      .then()
      .catch()
  }

  return (
    <div className={Styles.surveyResultWrap} >
      <Header />
      <SurveyResultContext.Provider value={{ onAnswer }} >
        <div data-testid="survey-result" className={Styles.contentWrap}>
          {surveyResult && (
            <SurveyResultData
              surveyResult={surveyResult}
            />
          )}
          {isLoading && <Loading />}
          {error && <Error error={error} reload={reload} />}
        </div>
      </SurveyResultContext.Provider>
      <Footer />
    </div>
  )
}

export default SurveyResult
