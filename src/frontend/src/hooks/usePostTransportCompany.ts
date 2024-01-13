import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { TransportCompanyPostDTO } from '../lib/api.types'

export const usePostTransportCompany = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['postTransportCompany'],
    mutationFn: (companyData: TransportCompanyPostDTO) =>
      customFetch('transportCompanies', { method: 'POST' }, companyData),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['transportCompanies'] })
    },
  })
}
