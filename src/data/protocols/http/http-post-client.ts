export interface HttpPostClient {
  post (params: HttpPostClient.Params): Promise<void>
}

export namespace HttpPostClient {
  export interface Params {
    url: string
  }
}
