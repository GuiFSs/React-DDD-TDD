import { HttpResponse } from '.'

export interface HttpPostClient<R = any> {
  post: (params: HttpPostClient.Params) => Promise<HttpResponse<R>>
}

export namespace HttpPostClient {
  export interface Params {
    url: string
    body?: any
  }
}
