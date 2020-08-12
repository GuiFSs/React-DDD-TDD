import React, { useContext, useMemo } from 'react'
import Spinner from '../Spinner'
import Styles from './styles.scss'
import Context from '@/presentation/contexts/form/form-context'

const FormStatus: React.FC = () => {
  const { state } = useContext(Context)
  const { isLoading, mainError } = useMemo(() => state, [state])

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && (
        <Spinner
          className={Styles.spinner}
        />
      )}
      {mainError && (
        <span data-testid='main-error' className={Styles.error}>{mainError}</span>
      )}
    </div>
  )
}

export default FormStatus
