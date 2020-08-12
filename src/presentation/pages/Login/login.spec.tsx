import React from 'react'
import faker from 'faker'
import { createMemoryHistory } from 'history'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import Login from '.'
import { ValidationSpy, AuthenticationSpy, Helper } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'
import { Router } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'

interface SutTypes {
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

interface SutParams {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }} >
      <Router history={history} >
        <Login
          validation={validationSpy}
          authentication={authenticationSpy}
        />
      </Router>
    </ApiContext.Provider>
  )
  return {
    validationSpy,
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField('email',email)
  Helper.populateField('password', password)
  const form = screen.getByTestId('form')

  fireEvent.submit(form)
  // wait for this component to re-render
  await waitFor(() => form)
}
describe('Login component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    expect(screen.getByTestId('submit')).toBeDisabled()
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
  })

  test('Should call Validation with correct email', () => {
    const { validationSpy } = makeSut()
    const email = faker.internet.email()

    Helper.populateField('email',email)

    expect(validationSpy.fieldName).toEqual('email')
    expect(validationSpy.input[validationSpy.fieldName]).toEqual(email)
  })

  test('Should call Validation with correct password', () => {
    const { validationSpy } = makeSut()
    const password = faker.internet.password()

    Helper.populateField('password', password)

    expect(validationSpy.fieldName).toEqual('password')
    expect(validationSpy.input[validationSpy.fieldName]).toEqual(password)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()

    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()

    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()

    Helper.populateField('email')
    Helper.populateField('password')
    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()

    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(email, password)

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })

    await simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    await simulateValidSubmit()

    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to signup page', () => {
    makeSut()
    const register = screen.getByTestId('signup-link')

    fireEvent.click(register)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
