import { HttpGetClient, HttpResponse } from '@/data/protocols/http/'
import { GetStorage } from '@/data/protocols/cache'
import { AccountModel } from '@/domain/models'

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor (
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async get<T = any>(params: HttpGetClient.Params): Promise<HttpResponse<T>> {
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
    return await this.httpGetClient.get(params)
  }
}
