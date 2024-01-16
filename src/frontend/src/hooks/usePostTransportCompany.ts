import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { TransportCompanyPostDTO } from '../lib/api.types'
import { useAuth } from '../components/auth/useAuth'

export const usePostTransportCompany = () => {
  const queryClient = useQueryClient()
  const { token } = useAuth()

  return useMutation({
    mutationKey: ['postTransportCompany'],
    mutationFn: (companyData: TransportCompanyPostDTO) =>
      customFetch('/transportCompanies', { method: 'POST' }, token, companyData),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['transportCompanies'] })
    },
  })
}
