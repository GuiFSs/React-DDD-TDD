import * as Helper from './http-mock'

const url = /signup/
export const mockEmailInUseError = (): void => Helper.mockEmailInUseError(url)
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError(url, 'POST')
