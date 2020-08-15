import { createContext } from 'react'

interface Props {
  onAnswer: (answer: string) => void
}

export default createContext<Props>(null)
