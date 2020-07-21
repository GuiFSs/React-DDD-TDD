import { HttpResponse } from './http-response'

export interface HttpPostClient {
  post (params: HttpPostClient.Params): Promise<HttpResponse>
}

export namespace HttpPostClient {
  export interface Params {
    url: string
    body?: object
  }
}
