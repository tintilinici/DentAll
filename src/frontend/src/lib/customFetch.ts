const BASE_URL = 'http://localhost:8080'

export const customFetch = async <T>(
  endpoint: string,
  options: RequestInit & { interesedInData?: boolean } = { interesedInData: true },
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

  if (!response.ok) {
    // If the status is not OK, handle the error here
    const errorData = await response.json()
    throw new Error(errorData.message || 'Something went wrong.')
  }

  // This is used to realy return. If the request is a plaintext response than we don't want to parse it as JSON since that will error.
  // Acctually we're not interested in the data, so we return null. This is a hacky solution, but it works.
  // If we have an error that will be handled
  if (!options?.interesedInData) {
    return null as T
  }

  const responseData = await response.json()

  return responseData
}
