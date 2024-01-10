import { useQuery } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { TransportCompany } from '../pages/transportAdmin/AllTransportCompaniesPage'

export const useGetTransportCompanies = () => {
  return useQuery({
    queryFn: () => customFetch<TransportCompany[]>('transportCompanies'),
    queryKey: ['transportCompanies'],
  })
}