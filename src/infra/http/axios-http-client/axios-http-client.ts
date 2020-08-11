import { HttpPostClient, HttpResponse } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient {
  async post<R = any> (params: HttpPostClient.Params): Promise<HttpResponse<R>> {
    let axiosResponse: AxiosResponse<R>
    try {
      axiosResponse = await axios.post<R>(params.url, params.body)
    } catch (error) {
      axiosResponse = error.response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
