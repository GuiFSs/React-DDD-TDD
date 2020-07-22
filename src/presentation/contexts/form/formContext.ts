import { createContext } from 'react'
import { LoginState, LoginErrorState } from '@/presentation/pages/Login'

export interface FormContext {
  state: LoginState
  errorState: LoginErrorState
}

export default createContext<FormContext>(null)
