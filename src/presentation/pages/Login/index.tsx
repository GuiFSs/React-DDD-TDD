import React, { useState, useEffect } from 'react'
import Styles from './styles.scss'
import LoginHeader from '@/presentation/components/LoginHeader'
import Footer from '@/presentation/components/footer'
import Input from '@/presentation/components/Input'
import FormStatus from '@/presentation/components/FormStatus'
import Context from '@/presentation/contexts/form/formContext'
import { Validation } from '@/presentation/protocols/validation'

interface Props {
  validation: Validation
}

export interface LoginState {
  isLoading: boolean
  email: string
  password: string
  emailError: string
  passwordError: string
  mainError: string
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState<LoginState>({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    setState(prev => ({
      ...prev,
      emailError: validation.validate('email', state.email)
    }))
  }, [state.email])

  useEffect(() => {
    setState(prev => ({
      ...prev,
      passwordError: validation.validate('password', state.password)
    }))
  }, [state.password])

  return (
    <div className={Styles.login} >
      <LoginHeader />
      <Context.Provider value={{ state, setState }} >
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input
            type="email"
            name="email"
            id=""
            placeholder="Digite seu e-mail"
          />
          <Input
            type="password"
            name="password"
            id=""
            placeholder="Digite sua senha"
          />
          <button
            data-testid='submit'
            className={Styles.submit}
            type='submit'
            disabled
          >
            Entrar
          </button>
          <span className={Styles.link}>
          Criar conta
          </span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
