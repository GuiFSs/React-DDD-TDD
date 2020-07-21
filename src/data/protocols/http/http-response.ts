export enum HttpStatusCode {
  noContent = 204,
  unathorized = 401
}

export interface HttpResponse {
  statusCode: HttpStatusCode
  body?: any
}
