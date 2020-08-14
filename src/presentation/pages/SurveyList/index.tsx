import React, { useEffect, useState } from 'react'
import Styles from './styles.scss'
import Footer from '@/presentation/components/Footer'
import Header from '@/presentation/components/Header'
import { SurveyListItem } from './components'
import { LoadSurveyList } from '@/domain/usecases'
import SurveyContext from './context/context'
import { useErrorHandler } from '@/presentation/hooks'
import Error from '@/presentation/components/Error'

interface Props {
  loadSurveyList: LoadSurveyList
}

interface State {
  surveys: LoadSurveyList.Model[]
  error: string
  reload: boolean
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const handleError = useErrorHandler((err: Error) => {
    setState(prev => ({ ...prev, error: err.message }))
  })

  const [state, setState] = useState<State>({
    surveys: [],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState(prev => ({ ...prev, surveys })))
      .catch(handleError)
  }, [state.reload])

  const reload = (): void => {
    setState(prev => ({
      surveys: [],
      error: '',
      reload: !prev.reload
    }))
  }

  return (
    <div className={Styles.surveyWrap} >
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }} >
          {state.error ? (
            <Error
              error={state.error}
              reload={reload}
            />
          ) : <SurveyListItem /> }
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
