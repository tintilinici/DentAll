import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'

export const useDeleteTransportCompanyMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteTransportCompany'],
    mutationFn: (companyId: string) =>
      customFetch(`transportCompanies/${companyId}`, { method: 'DELETE', interesedInData: false }),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['transportCompanies'] })
    },
  })
}
