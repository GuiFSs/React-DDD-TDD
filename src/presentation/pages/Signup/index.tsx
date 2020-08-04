import React, { useState } from 'react'
import Styles from './styles.scss'
import LoginHeader from '@/presentation/components/LoginHeader'
import Footer from '@/presentation/components/Footer'
import Input from '@/presentation/components/Input'
import FormStatus from '@/presentation/components/FormStatus'
import Context from '@/presentation/contexts/form/formContext'

const Signup: React.FC = () => {
  const [state, setState] = useState({
    isLoading: false,
    nameError: 'Campo obrigatório',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: ''
  })

  return (
    <div className={Styles.signup} >
      <LoginHeader />
      <Context.Provider value={{ state, setState }} >
        <form className={Styles.form} >
          <h2>Criar Conta</h2>
          <Input
            type="text"
            name="name"
            placeholder="Digite seu nome"
          />
          <Input
            type="email"
            name="email"
            placeholder="Digite seu email"
          />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repita sua senha"
          />
          <button
            data-testid='submit'
            disabled
            className={Styles.submit}
            type='submit'
          >
            Cadastrar
          </button>
          <span className={Styles.link} >
            Voltar Para Login
          </span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup
