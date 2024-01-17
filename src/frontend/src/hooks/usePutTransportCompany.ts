import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TransportCompanyPostDTO } from '../lib/api.types'
import { useCustomFetch } from './useCustomFetch'

export const usePutTransportCompany = (transportCompanyId: string) => {
  const queryClient = useQueryClient()
  const customFetch = useCustomFetch()

  return useMutation({
    mutationKey: ['putAccommodationOrder'],
    mutationFn: (transportComapnyDetails: TransportCompanyPostDTO) =>
      customFetch(
        `/transportCompanies/${transportCompanyId}`,
        { method: 'PUT' },
        transportComapnyDetails
      ),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['transportComapnyDetails', transportCompanyId],
      })
    },
  })
}
