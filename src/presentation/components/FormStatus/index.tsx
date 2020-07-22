import React, { useContext } from 'react'
import Spinner from '../Spinner'
import Styles from './styles.scss'
import Context from '@/presentation/contexts/form/formContext'

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(Context)
  const { isLoading } = state
  const { main: errorMessage } = errorState

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && (
        <Spinner
          className={Styles.spinner}
        />
      )}
      {errorMessage && (
        <span className={Styles.error}>{errorMessage}</span>
      )}
    </div>
  )
}

export default FormStatus
