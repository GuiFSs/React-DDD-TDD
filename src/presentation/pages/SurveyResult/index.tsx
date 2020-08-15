import React, { useState, useEffect } from 'react'
import Header from '@/presentation/components/Header'
import Footer from '@/presentation/components/Footer'
import Styles from './styles.scss'
import Loading from '@/presentation/components/Loading'
import { LoadSurveyResult } from '@/domain/usecases'
import Error from '@/presentation/components/Error'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResultData } from './components'

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
          <SurveyResultData
            surveyResult={surveyResult}
          />
        )}
        {isLoading && <Loading />}
        {error && <Error error={error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
