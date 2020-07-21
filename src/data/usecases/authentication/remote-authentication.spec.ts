import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { mockAuthentication, mockAccountModel } from '@/domain/test/mock-account'
import faker from 'faker'
import { RemoteAuthentication } from './remote-authentication'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { Authentication } from '@/domain/usecases/authentication'
import { AccountModel } from '@/domain/models/account-models'

interface SutTypes {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<Authentication.Params, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<Authentication.Params, AccountModel>()
  // sut = System Under Test - object that we are testing in this class
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return { sut, httpPostClientSpy }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL ', async () => {
    const url = faker.internet.url()
    const { httpPostClientSpy, sut } = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpPostClient with correct body', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)
    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })

  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized
    }
    const authenticationParams = mockAuthentication()
    const promise = sut.auth(authenticationParams)
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const authenticationParams = mockAuthentication()
    const promise = sut.auth(authenticationParams)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const authenticationParams = mockAuthentication()
    const promise = sut.auth(authenticationParams)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const authenticationParams = mockAuthentication()
    const promise = sut.auth(authenticationParams)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an AccountModel if HttpPostClient returns 200', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    const httpResult = mockAccountModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const authenticationParams = mockAuthentication()
    const account = await sut.auth(authenticationParams)
    expect(account).toEqual(httpResult)
  })
})
