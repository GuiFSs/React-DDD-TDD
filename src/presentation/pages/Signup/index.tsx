import React, { useState, useEffect, useMemo } from 'react'
import Styles from './styles.scss'
import LoginHeader from '@/presentation/components/LoginHeader'
import Footer from '@/presentation/components/Footer'
import Input from '@/presentation/components/Input'
import FormStatus from '@/presentation/components/FormStatus'
import Context from '@/presentation/contexts/form/formContext'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import { useHistory, Link } from 'react-router-dom'
import SubmitButton from '@/presentation/components/SubmitButton'

interface Props {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const Signup: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const history = useHistory()
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

  const isFormInvalid = useMemo(() => {
    const { nameError, emailError, passwordError, passwordConfirmationError } = state
    return !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError
  }, [state])

  useEffect(() => {
    const formData = { name: state.name }
    setState(prev => ({
      ...prev,
      nameError: validation.validate('name', formData)
    }))
  }, [state.name])

  useEffect(() => {
    const formData = { email: state.email }
    setState(prev => ({
      ...prev,
      emailError: validation.validate('email', formData)
    }))
  }, [state.email])

  useEffect(() => {
    const formData = { password: state.password }
    setState(prev => ({
      ...prev,
      passwordError: validation.validate('password', formData)
    }))
  }, [state.password])

  useEffect(() => {
    const formData = { passwordConfirmation: state.passwordConfirmation, password: state.password }
    setState(prev => ({
      ...prev,
      passwordConfirmationError: validation.validate('passwordConfirmation', formData)
    }))
  }, [state.passwordConfirmation, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      const { email, name, password, passwordConfirmation, isLoading } = state
      if (isLoading || isFormInvalid) return

      setState(prev => ({
        ...prev,
        isLoading: true
      }))
      const account = await addAccount.add({
        name,
        email,
        password,
        passwordConfirmation
      })
      await saveAccessToken.save(account.accessToken)
      history.replace('/')
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

  return (
    <div className={Styles.signupWrap} >
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
          <SubmitButton
            text='Cadastrar'
            disabled={isFormInvalid}
          />
          <Link data-testid="login-link" replace to='/login' className={Styles.link} >
            Voltar Para Login
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup
