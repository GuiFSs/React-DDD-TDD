import * as Http from './http-mock'

const url = /surveys/
export const mockUnexpectedError = (): void => Http.mockServerError(url, 'GET')
