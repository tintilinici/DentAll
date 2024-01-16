import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { useAuth } from '../components/auth/useAuth'

export const useDeleteAdminMutation = () => {
  const queryClient = useQueryClient()
  const { token } = useAuth()

  return useMutation({
    mutationKey: ['deleteAdmin'],
    mutationFn: (email: string) =>
      customFetch(
        `/security/users/${email}`,
        { method: 'DELETE', interesedInData: false },
        token
      ),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
