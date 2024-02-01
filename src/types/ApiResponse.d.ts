declare namespace ApiResponse {
  type Response<T> = {
    body?: T
    status: number
    statusText: string
    originalResponse?: Response
    message?: string
  }
}
