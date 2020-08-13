import React, { useEffect, useState, useContext } from 'react'
import Styles from './styles.scss'
import Footer from '@/presentation/components/Footer'
import Header from '@/presentation/components/Header'
import { SurveyListItem, SurveyError } from './components'
import { LoadSurveyList } from '@/domain/usecases'
import SurveyContext from './context/context'
import { AccessDeniedError } from '@/domain/errors'
import { useHistory } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'

interface Props {
  loadSurveyList: LoadSurveyList
}

interface State {
  surveys: LoadSurveyList.Model[]
  error: string
  reload: boolean
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()
  const [state, setState] = useState<State>({
    surveys: [],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState(prev => ({ ...prev, surveys })))
      .catch(err => {
        if (err instanceof AccessDeniedError) {
          setCurrentAccount(undefined)
          history.replace('/login')
        } else {
          setState(prev => ({ ...prev, error: err.message }))
        }
      })
  }, [state.reload])

  return (
    <div className={Styles.surveyWrap} >
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }} >
          {state.error ? <SurveyError /> : <SurveyListItem /> }
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
