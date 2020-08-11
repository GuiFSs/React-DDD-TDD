export interface HttpGetClient<R = any> {
  get: (params: HttpGetClient.Params) => Promise<void>
}

export namespace HttpGetClient {
  export interface Params {
    url: string
  }
}
