import React, { useState } from 'react'
import Styles from './styles.scss'
import LoginHeader from '@/presentation/components/LoginHeader'
import Footer from '@/presentation/components/footer'
import Input from '@/presentation/components/Input'
import FormStatus from '@/presentation/components/FormStatus'
import Context from '@/presentation/contexts/form/formContext'

export interface LoginState {
  isLoading: boolean
}

export interface LoginErrorState {
  email: string
  password: string
  main: string
}

const Login: React.FC = () => {
  const [state] = useState<LoginState>({
    isLoading: false
  })

  const [errorState] = useState<LoginErrorState>({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    main: ''
  })

  return (
    <div className={Styles.login} >
      <LoginHeader />
      <Context.Provider value={{ state, errorState }} >
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
