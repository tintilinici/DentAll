import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'

export const usePostTransportCompany = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (companyData) => customFetch('transportCompanies', { method: 'POST' }, companyData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transportCompanies'] })
    },
  })
}
