import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '../../test/mock-http-client'

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL ', async () => {
    const url = 'any_url'
    const httpPostClientSpy = new HttpPostClientSpy()
    // sut = System Under Test - object that we are testing in this class
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
