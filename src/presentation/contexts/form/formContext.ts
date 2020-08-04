import { createContext } from 'react'
// import { LoginState } from '@/presentation/pages/Login'

export interface FormContext {
  state: any
  setState: (newState: any) => void
}

export default createContext<FormContext>(null)
