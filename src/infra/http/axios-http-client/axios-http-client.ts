import { HttpPostClient, HttpResponse } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post<R> (params: HttpPostClient.Params<any>): Promise<HttpResponse<R>> {
    const httpResponse = await axios.post<R>(params.url, params.body)
    const { data, status } = httpResponse
    return {
      statusCode: status,
      body: data
    }
  }
}
