import { createContext } from 'react'

export interface SurveyContext {
  state: any
  setState: (newState: any) => void
}
const SurveyContext = createContext<SurveyContext>(null)

export default SurveyContext
