import React, { memo } from 'react'
import Styles from './styles.scss'

const _Footer: React.FC = () => {
  return (
    <footer className={Styles.footer}/>
  )
}
const Footer = memo(_Footer)

export default Footer
