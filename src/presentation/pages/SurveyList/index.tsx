import React, { useEffect, useState } from 'react'
import Styles from './styles.scss'
import Footer from '@/presentation/components/Footer'
import Header from '@/presentation/components/Header'
import { SurveyListItem, SurveyError } from './components'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import SurveyContext from './context/context'

interface Props {
  loadSurveyList: LoadSurveyList
}

interface State {
  surveys: SurveyModel[]
  error: string
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState<State>({
    surveys: [],
    error: ''
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState(prev => ({ ...prev, surveys })))
      .catch(err => setState(prev => ({ ...prev, error: err.message })))
  }, [])

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
