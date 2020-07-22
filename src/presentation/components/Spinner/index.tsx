import React from 'react'
import Styles from './styles.scss'

type Props = React.HTMLAttributes<HTMLElement>

const Spinner: React.FC<Props> = ({ className }: Props) => {
  return (
    <div className={[Styles.spinner, className].join(' ')}><div></div><div></div><div></div><div></div></div>
  )
}

export default Spinner