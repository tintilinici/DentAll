export const API_URL = 'http://localhost:8080'

export const getTransportCompanies = async () => {
  const response = await fetch(`${API_URL}/transportCompanies`)
  return await response.json()
}

export const getTransportCompanyDetails = async (id: string | undefined) => {
  const response = await fetch(`${API_URL}/transportCompanies/${id}`)
  const data = await response.json()

  if (response.status === 400) {
    throw new Error(data.message)
  }
  return data
}
