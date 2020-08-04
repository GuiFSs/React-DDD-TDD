import React, { useState, useEffect, useMemo } from 'react'
import Styles from './styles.scss'
import LoginHeader from '@/presentation/components/LoginHeader'
import Footer from '@/presentation/components/Footer'
import Input from '@/presentation/components/Input'
import FormStatus from '@/presentation/components/FormStatus'
import Context from '@/presentation/contexts/form/formContext'
import { Validation } from '@/presentation/protocols/validation'

interface Props {
  validation: Validation
}

const Signup: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    nameError: '',
    emailError: '',
    password: '',
    passwordError: '',
    passwordConfirmation: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    setState(prev => ({
      ...prev,
      nameError: validation.validate('name', state.name)
    }))
  }, [state.name])

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

  useEffect(() => {
    setState(prev => ({
      ...prev,
      passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation)
    }))
  }, [state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setState(prev => ({
      ...prev,
      isLoading: true
    }))
  }

  const isLoginBtnDisabled = useMemo(() => {
    return !!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError
  }, [state.emailError, state.passwordError])

  return (
    <div className={Styles.signup} >
      <LoginHeader />
      <Context.Provider value={{ state, setState }} >
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit} >
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
            disabled={isLoginBtnDisabled}
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
