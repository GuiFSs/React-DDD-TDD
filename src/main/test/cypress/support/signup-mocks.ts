import * as Http from './http-mock'
import faker from 'faker'

const url = /signup/
export const mockEmailInUseError = (): void => Http.mockForbiddenError(url, 'POST')
export const mockUnexpectedError = (): void => Http.mockServerError(url, 'POST')
export const mockOk = (): void => Http.mockOk(url, 'POST',{
  accessToken: faker.random.uuid(),
  name: faker.name.findName()
})
