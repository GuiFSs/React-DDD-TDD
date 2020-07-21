import { HttpResponse } from '.'

export interface HttpPostClient<T, R> {
  post (params: HttpPostClient.Params<T>): Promise<HttpResponse<R>>
}

export namespace HttpPostClient {
  export interface Params<T> {
    url: string
    body?: T
  }
}
