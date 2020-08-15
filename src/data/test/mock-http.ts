import faker from 'faker'
import { HttpResponse, HttpStatusCode, HttpClient } from '@/data/protocols/http/'

export const mockHttpRequest = (): HttpClient.Request => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement()

})

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string
  method?: string
  headers?: string
  body?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async request (data: HttpClient.Request): Promise<HttpResponse<R>> {
    const { url, body, method, headers } = data
    this.url = url
    this.body = body
    this.method = method
    this.headers = headers
    return this.response
  }
}
