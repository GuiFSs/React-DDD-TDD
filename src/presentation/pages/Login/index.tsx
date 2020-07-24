import React, { useState, useEffect, useMemo } from 'react'
import Styles from './styles.scss'
import LoginHeader from '@/presentation/components/LoginHeader'
import Footer from '@/presentation/components/footer'
import Input from '@/presentation/components/Input'
import FormStatus from '@/presentation/components/FormStatus'
import Context from '@/presentation/contexts/form/formContext'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'
import { Link } from 'react-router-dom'

interface Props {
  validation: Validation
  authentication: Authentication
}

export interface LoginState {
  isLoading: boolean
  email: string
  password: string
  emailError: string
  passwordError: string
  mainError: string
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }
      setState(prev => ({
        ...prev,
        isLoading: true
      }))
      const { email, password } = state
      const account = await authentication.auth({
        email,
        password
      })
      localStorage.setItem('accessToken', account.accessToken)
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        mainError: err.message
      }))
    }
  }

  const isLoginBtnDisabled = useMemo(() => {
    return !!state.emailError || !!state.passwordError
  }, [state.emailError, state.passwordError])

  return (
    <div className={Styles.login} >
      <LoginHeader />
      <Context.Provider value={{ state, setState }} >
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
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
            disabled={isLoginBtnDisabled}
          >
            Entrar
          </button>
          <Link data-testid="signup" to='/signup' className={Styles.link} >
            Criar conta
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
