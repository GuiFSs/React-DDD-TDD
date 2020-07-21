import { HttpPostClient } from 'data/protocols/http/http-post-client'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  async post (params: HttpPostClient.Params): Promise<void> {
    const { url } = params
    this.url = url
    return Promise.resolve()
  }
}
