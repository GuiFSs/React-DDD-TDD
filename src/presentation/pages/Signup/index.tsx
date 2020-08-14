import React, { useState, useEffect, useMemo,useContext } from 'react'
import Styles from './styles.scss'
import LoginHeader from '@/presentation/components/LoginHeader'
import Footer from '@/presentation/components/Footer'
import Input from '@/presentation/components/Input'
import FormStatus from '@/presentation/components/FormStatus'
import { FormContext, ApiContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount } from '@/domain/usecases'
import { useHistory, Link } from 'react-router-dom'
import SubmitButton from '@/presentation/components/SubmitButton'

interface Props {
  validation: Validation
  addAccount: AddAccount
}

const Signup: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
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

  useEffect(() => { validate('name') }, [state.name])
  useEffect(() => { validate('email') }, [state.email])
  useEffect(() => { validate('password') }, [state.password])
  useEffect(() => { validate('passwordConfirmation') }, [state.passwordConfirmation])

  const validate = (field: string): void => {
    const { password, email, name, passwordConfirmation } = state
    const formData = { password, email, name, passwordConfirmation }
    setState(prev => ({
      ...prev,
      [`${field}Error`]: validation.validate(field, formData)
    }))
  }

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
      setCurrentAccount(account)
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
      <FormContext.Provider value={{ state, setState }} >
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
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Signup
