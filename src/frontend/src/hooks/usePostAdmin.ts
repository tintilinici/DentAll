import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { useAuth } from '../components/auth/useAuth'

export const usePostAdmin = () => {
  const queryClient = useQueryClient()
  const { token } = useAuth()

  return useMutation({
    mutationKey: ['postAdmin'],
    mutationFn: (data: {email: string, roles: string[], password: string}) =>
      customFetch(`/security/register`, { interesedInData: false, method: 'POST' }, token, data),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}