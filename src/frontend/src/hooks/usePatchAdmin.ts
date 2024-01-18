import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { useAuth } from '../components/auth/useAuth'

export const usePatchAdmin = () => {
  const queryClient = useQueryClient()
  const { token } = useAuth()

  return useMutation({
    mutationKey: ['patchAdmin'],
    mutationFn: (data: {email: string, roles: string[]}) =>
      customFetch(`/security/update-roles?email=${data.email}`, { interesedInData: false, method: 'PATCH' }, token, data.roles),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}