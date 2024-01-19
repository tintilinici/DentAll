import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCustomFetch } from './useCustomFetch'

export const useDeleteTransportCompanyMutation = () => {
  const queryClient = useQueryClient()
  const customFetch = useCustomFetch()

  return useMutation({
    mutationKey: ['deleteTransportCompany'],
    mutationFn: (companyId: string) =>
      customFetch(`/transportCompanies/${companyId}`, {
        method: 'DELETE',
        interesedInData: false,
      }),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['transportCompanies'] })
    },
  })
}
