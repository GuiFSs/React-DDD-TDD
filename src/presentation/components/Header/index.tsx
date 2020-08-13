import React, { memo, useContext } from 'react'
import Logo from '@/presentation/components/Logo'
import Styles from './styles.scss'
import { ApiContext } from '@/presentation/contexts'
import { useLogout } from '@/presentation/hooks'

const Header: React.FC = () => {
  const { getCurrentAccount } = useContext(ApiContext)
  const logout = useLogout()

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    logout()
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent} >
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">
            {getCurrentAccount().name}
          </span>
          <a
            data-testid="logout"
            href="#"
            onClick={handleLogoutClick}
          >
            Sair
          </a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
