import { createContext } from 'react'
import { AccountModel } from '@/domain/models'
// import { LoginState } from '@/presentation/pages/Login'

interface Props {
  setCurrentAccount?: (account: AccountModel) => void
}

export default createContext<Props>(null)
