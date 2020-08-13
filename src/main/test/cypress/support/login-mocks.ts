import * as Http from './http-mock'
import faker from 'faker'

const url = /login/
export const mockInvalidCredentialsError = (): void => Http.mockUnauthorizedError(url)
export const mockUnexpectedError = (): void => Http.mockServerError(url, 'POST')
export const mockOk = (): void => Http.mockOk(url, 'POST',{
  accessToken: faker.random.uuid(),
  name: faker.name.findName()
})
