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

  return (
    <div
      data-testid={`${props.name}-wrap`}
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        title={error}
        placeholder=" "
        data-testid={props.name}
        onChange={handleChange}
      />
      <label
        data-testid={`${props.name}-label`}
        title={error}
      >
        {props.placeholder}
      </label>
    </div>
  )
}

export default Input
