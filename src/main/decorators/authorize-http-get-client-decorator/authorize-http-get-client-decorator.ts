import { HttpGetClient, HttpResponse } from '@/data/protocols/http/'
import { GetStorage } from '@/data/protocols/cache'
import { AccountModel } from '@/domain/models'

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor (
    private readonly getStorage: GetStorage,
    private readonly httpGetClientSpy: HttpGetClient
  ) {}

  async get (params: HttpGetClient.Params): Promise<HttpResponse> {
    const account = this.getStorage.get<AccountModel>('account')
    if (account?.accessToken) {
      Object.assign(params, {
        headers: {
          'x-access-token': account.accessToken
        }
      })
    }
    await this.httpGetClientSpy.get(params)
    return null
  }
}
