import { HttpPostClient, HttpResponse } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient {
  async post<R = any> (params: HttpPostClient.Params): Promise<HttpResponse<R>> {
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
