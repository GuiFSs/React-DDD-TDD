import * as Helper from './http-mock'
import faker from 'faker'

const url = /signup/
export const mockEmailInUseError = (): void => Helper.mockEmailInUseError(url)
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError(url, 'POST')
export const mockInvalidData = (): void => Helper.mockOk(url, 'POST',{
  invalid: faker.random.uuid()
})
export const mockOk = (): void => Helper.mockOk(url, 'POST',{
  accessToken: faker.random.uuid(),
  name: faker.name.findName()
})
