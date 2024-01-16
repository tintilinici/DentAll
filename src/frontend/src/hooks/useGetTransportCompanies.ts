import { useQuery } from '@tanstack/react-query'
import { TransportCompany } from '../lib/api.types'
import { useCustomFetch } from './useCustomFetch'

export const useGetTransportCompanies = () => {
  const customFetch = useCustomFetch()

  return useQuery({
    queryFn: () => customFetch<TransportCompany[]>('/transportCompanies'),
    queryKey: ['transportCompanies'],
  })
}
