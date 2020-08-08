import * as Helper from './http-mock'

const url = /signup/
export const mockEmailInUseError = (): void => Helper.mockEmailInUseError(url)
