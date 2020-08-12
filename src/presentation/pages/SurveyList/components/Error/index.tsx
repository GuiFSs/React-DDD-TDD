import React, { useContext } from 'react'
import SurveyContext from '@/presentation/pages/SurveyList/context/context'
import Styles from './styles.scss'

const Error: React.FC = () => {
  const { state } = useContext(SurveyContext)
  return (
    <div>
      <span className={Styles.errorWrap} data-testid="error">
        {state.error}
      </span>
      <button>Recarregar</button>
    </div>
  )
}

export default Error
