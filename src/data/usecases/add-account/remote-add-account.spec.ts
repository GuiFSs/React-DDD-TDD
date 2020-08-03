import { HttpPostClientSpy } from '@/data/test'
import { AccountModel } from '@/domain/models'
import { AddAccount } from '@/domain/usecases'
import { mockAddAccountParams } from '@/domain/test'
import { RemoteAddAccount } from './remote-add-account'
import faker from 'faker'

interface SutTypes {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccount.Params, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccount.Params, AccountModel>()
  // sut = System Under Test - object that we are testing in this class
  const sut = new RemoteAddAccount(url,httpPostClientSpy)
  return { sut, httpPostClientSpy }
}

describe('RemoteAddAccount', () => {
  test('Should call HttpPostClient with correct URL ', async () => {
    const url = faker.internet.url()
    const { httpPostClientSpy, sut } = makeSut(url)
    await sut.add(mockAddAccountParams())
    expect(httpPostClientSpy.url).toBe(url)
  })
})
