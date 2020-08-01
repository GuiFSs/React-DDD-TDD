import { HttpPostClient, HttpResponse } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post<R> (params: HttpPostClient.Params<any>): Promise<HttpResponse<R>> {
    let httpResponse: AxiosResponse<R>
    try {
      httpResponse = await axios.post<R>(params.url, params.body)
    } catch (error) {
      httpResponse = error.response
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
