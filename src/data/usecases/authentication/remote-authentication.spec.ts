import { HttpStatusCode } from '@/data/protocols/http'
import { HttpClientSpy } from '@/data/test'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { mockAuthenticationModel, mockAuthentication } from '@/domain/test'
import { RemoteAuthentication } from './remote-authentication'
import faker from 'faker'

interface SutTypes {
  sut: RemoteAuthentication
  httpClientSpy: HttpClientSpy<RemoteAuthentication.Model>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteAuthentication.Model>()
  // sut = System Under Test - object that we are testing in this class
  const sut = new RemoteAuthentication(url, httpClientSpy)
  return { sut, httpClientSpy }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { httpClientSpy, sut } = makeSut(url)
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.body).toEqual(authenticationParams)
  })

  test('Should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    const { httpClientSpy, sut } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const authenticationParams = mockAuthentication()
    const promise = sut.auth(authenticationParams)
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { httpClientSpy, sut } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const authenticationParams = mockAuthentication()
    const promise = sut.auth(authenticationParams)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { httpClientSpy, sut } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const authenticationParams = mockAuthentication()
    const promise = sut.auth(authenticationParams)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { httpClientSpy, sut } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const authenticationParams = mockAuthentication()
    const promise = sut.auth(authenticationParams)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an Authentication.Model if HttpClient returns 200', async () => {
    const { httpClientSpy, sut } = makeSut()
    const httpResult = mockAuthenticationModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const authenticationParams = mockAuthentication()
    const account = await sut.auth(authenticationParams)
    expect(account).toEqual(httpResult)
  })
})
