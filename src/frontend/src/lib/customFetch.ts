const BASE_URL = 'http://localhost:8080'

export const customFetch = async <T>(
  endpoint: string,
  options?: RequestInit,
  data?: unknown
): Promise<T> => {
  const url = `${BASE_URL}/${endpoint}`

  const headers = { 'Content-Type': 'application/json' }

  const requestOptions: RequestInit = {
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  }

  if (data && ['POST', 'PUT'].includes(requestOptions.method || '')) {
    requestOptions.body = JSON.stringify(data)
  }

  const response = await fetch(url, requestOptions)
  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(responseData.message || 'Something went wrong.')
  }

  return responseData
}
