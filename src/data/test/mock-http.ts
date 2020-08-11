import faker from 'faker'
import { HttpPostClient, HttpResponse, HttpStatusCode, HttpGetClient } from '@/data/protocols/http/'

export const mockPostRequest = (): HttpPostClient.Params => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

export const mockGetRequest = (): HttpGetClient.Params => ({
  url: faker.internet.url()
})

export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  url?: string
  body?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostClient.Params): Promise<HttpResponse<R>> {
    const { url, body } = params
    this.url = url
    this.body = body
    return this.response
  }
}

export class HttpGetClientSpy<R> implements HttpGetClient<R> {
  url: string
  body?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async get (params: HttpGetClient.Params): Promise<HttpResponse<R>> {
    this.url = params.url
    return this.response
  }
}
