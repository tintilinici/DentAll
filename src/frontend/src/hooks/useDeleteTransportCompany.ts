import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { useAuth } from '../components/auth/useAuth'

export const useDeleteTransportCompanyMutation = () => {
  const queryClient = useQueryClient()
  const { token } = useAuth()

  return useMutation({
    mutationKey: ['deleteTransportCompany'],
    mutationFn: (companyId: string) =>
      customFetch(
        `/transportCompanies/${companyId}`,
        { method: 'DELETE', interesedInData: false },
        token
      ),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['transportCompanies'] })
    },
  })
}
