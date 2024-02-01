const DEFAULT: {
  headers: RequestInit['headers']
} = {
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  }
}

function _getHeaders(headers?: RequestInit['headers']) {
  return {
    ...DEFAULT.headers,
    ...headers
  }
}

const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

const interceptor = (res: Response) => {
  if (!res?.ok) {
    return Promise.reject(res)
  }
  return res
}

const constructResponse = <T>(
  response: Response,
  body: T
): ApiResponse.Response<T> => ({
  status: response?.status ?? 500,
  statusText: response?.statusText ?? 'Error',
  body,
  originalResponse: response ?? {}
})

const dataIntercept = <T>(response: Response) =>
  response.json().then(res => constructResponse<T>(response, res))

const errorInterceptor = (err: Response) => {
  if (err.status === 404) {
    throw constructResponse(err, { message: 'Not found' })
  } else {
    throw constructResponse(err, { message: 'Server busy' })
  }
}

const getDataViaApi = async <T>(
  url: string,
  headerParams?: RequestInit['headers']
) => {
  try {
    const res = await fetch(url, {
      method: HTTP_METHOD.GET,
      headers: _getHeaders(headerParams)
    })
    const response = await interceptor(res)
    return dataIntercept<T>(response)
  } catch (err) {
    throw errorInterceptor(err as Response)
  }
}

export { getDataViaApi }
