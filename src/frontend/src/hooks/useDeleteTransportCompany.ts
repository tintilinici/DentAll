import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../components/auth/useAuth'

export const useDeleteTransportCompanyMutation = () => {
  const queryClient = useQueryClient()
  const { token } = useAuth()

  return useMutation({
    mutationKey: ['deleteTransportCompany'],
    mutationFn: async (companyId: string) => {
      const res = await fetch(`http://localhost:8080/transportCompanies/${companyId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Something went wrong.')
      }
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['transportCompanies'] })
    },
  })
}
