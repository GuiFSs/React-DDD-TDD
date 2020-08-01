import { createContext } from 'react'
import { LoginState } from '@/presentation/pages/Login'

export interface FormContext {
  state: LoginState
  setState: (newState: LoginState) => void
}

export default createContext<FormContext>(null)
