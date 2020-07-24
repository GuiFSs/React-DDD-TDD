import React, { useContext, useMemo } from 'react'
import Context from '@/presentation/contexts/form/formContext'
import Styles from './styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)

  function handleChange (event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target
    setState({
      ...state,
      [name]: value
    })
  }

  const error = useMemo(() => state[`${props.name}Error`], [props.name, state])

  const { status, title } = useMemo(() => {
    return {
      status: error ? '🔴' : '🟢',
      title: error || 'Tudo certo!'
    }
  }, [error])

  return (
    <div className={Styles.inputWrap} >
      <input
        {...props}
        data-testid={props.name}
        onChange={handleChange}
      />
      <span
        data-testid={`${props.name}-status`}
        title={title}
        className={Styles.status}
      >
        {status}
      </span>
    </div>
  )
}

export default Input
