import { HttpResponse } from '.'

export interface HttpGetClient<R = any> {
  get: (params: HttpGetClient.Params) => Promise<HttpResponse<R>>
}

export namespace HttpGetClient {
  export interface Params {
    url: string
  }
}
