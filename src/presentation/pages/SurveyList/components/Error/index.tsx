import React, { useContext } from 'react'
import SurveyContext from '@/presentation/pages/SurveyList/context/context'
import Styles from './styles.scss'

const Error: React.FC = () => {
  const { state, setState } = useContext(SurveyContext)
  const reload = (): void => {
    setState(prev => ({
      ...prev,
      surveys: [],
      error: '',
      reload: !prev.reload
    }))
  }

  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">
        {state.error}
      </span>
      <button onClick={reload} data-testid='reload'>
        Tentar novamente
      </button>
    </div>
  )
}

export default Error
