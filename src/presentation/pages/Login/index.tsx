import React, { useState, useEffect, useMemo } from 'react'
import Styles from './styles.scss'
import LoginHeader from '@/presentation/components/LoginHeader'
import Footer from '@/presentation/components/Footer'
import Input from '@/presentation/components/Input'
import FormStatus from '@/presentation/components/FormStatus'
import Context from '@/presentation/contexts/form/formContext'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication,SaveAccessToken } from '@/domain/usecases'
import { Link, useHistory } from 'react-router-dom'
import SubmitButton from '@/presentation/components/SubmitButton'

interface Props {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

export interface LoginState {
  isLoading: boolean
  email: string
  password: string
  emailError: string
  passwordError: string
  mainError: string
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props) => {
  const history = useHistory()
  const [state, setState] = useState<LoginState>({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })
  const isFormInValid = useMemo(() => {
    return !!state.emailError || !!state.passwordError
  }, [state.emailError, state.passwordError])

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
      if (state.isLoading || isFormInValid) return

      setState(prev => ({
        ...prev,
        isLoading: true
      }))
      const { email, password } = state
      const account = await authentication.auth({
        email,
        password
      })
      await saveAccessToken.save(account.accessToken)
      history.replace('/')
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        mainError: err.message
      }))
    }
  }

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
          <SubmitButton
            text='Entrar'
            disabled={isFormInValid}
          />
          <Link data-testid="signup-link" to='/signup' className={Styles.link} >
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
