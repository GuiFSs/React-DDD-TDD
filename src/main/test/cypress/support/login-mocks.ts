import * as Helper from './http-mock'
import faker from 'faker'

const url = /login/
export const mockInvalidCredentialsError = (): void => Helper.mockInvalidCredentialsError(url)
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError(url, 'POST')
export const mockOk = (): void => Helper.mockOk(url, 'POST',{
  accessToken: faker.random.uuid()
})
export const mockInvalidData = (): void => Helper.mockOk(url, 'POST',{
  invalid: faker.random.uuid()
})
