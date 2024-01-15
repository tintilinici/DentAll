import { useAuth } from '../components/auth/useAuth'

export const useCustomFetch = () => {
  const { token, logout } = useAuth()

  return async <T>(
    endpoint: string,
    { interesedInData = true, ...options }: RequestInit & { interesedInData?: boolean } = {}, // Add default value and make it optional
    data?: unknown
  ): Promise<T> => {
    const url = `${import.meta.env.VITE_FRONTEND_URL}${endpoint}`

    let headers: HeadersInit = { 'Content-Type': 'application/json' }
    if (token) {
      headers = { ...headers, Authorization: `Bearer ${token}` }
    }

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

    if (response.status === 403) {
      console.log('GOT 403, logging out user')
      logout()
    }

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Something went wrong.')
    }

    // This is used to realy return. If the request is a plaintext response than we don't want to parse it as JSON since that will error.
    // Acctually we're not interested in the data, so we return null. This is a hacky solution, but it works.
    // If we have an error that will be handled
    if (!interesedInData) {
      return null as T
    }

    const responseData = await response.json()

    return responseData
  }
}
