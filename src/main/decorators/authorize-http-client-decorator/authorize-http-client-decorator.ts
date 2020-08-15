import { HttpClient, HttpResponse } from '@/data/protocols/http/'
import { GetStorage } from '@/data/protocols/cache'
import { AccountModel } from '@/domain/models'

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor (
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpClient
  ) {}

  async request<T = any>(params: HttpClient.Request): Promise<HttpResponse<T>> {
    const account = this.getStorage.get<AccountModel>('account')
    if (account?.accessToken) {
      params = {
        ...params,
        headers: {
          ...params.headers,
          'x-access-token': account.accessToken
        }
      }
    }
    return await this.httpGetClient.request(params)
  }
}
