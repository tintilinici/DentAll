import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../components/auth/useAuth'
import { customFetch } from '../lib/customFetch'
import { TransportCompany } from '../lib/api.types'

export const useGetTransportCompanyDetails = (id: string) => {
  const { token } = useAuth()

  return useQuery({
    queryFn: () => customFetch<TransportCompany>(`/transportCompanies/${id}`, {}, token),
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['transportComapnyDetails', id],
  })
}
