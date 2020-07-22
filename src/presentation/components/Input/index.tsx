import React, { useContext, useMemo } from 'react'
import Context from '@/presentation/contexts/form/formContext'
import Styles from './styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { errorState } = useContext(Context)

  const error = useMemo(() => errorState[props.name], [props.name, errorState])

  const status = useMemo(() => {
    return '🔴'
  }, [])

  return (
    <div className={Styles.inputWrap} >
      <input {...props} />
      <span
        data-testid={`${props.name}-status`}
        title={error}
        className={Styles.status}
      >
        {status}
      </span>
    </div>
  )
}

export default Input
