import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { Accommodation } from '../lib/api.types'
import { useAuth } from '../components/auth/useAuth'

export const usePostAccommodation = () => {
  const queryClient = useQueryClient()
  const { token } = useAuth()

  return useMutation({
    mutationKey: ['postAccommodation'],
    mutationFn: (accommodationData: Accommodation) =>
      customFetch(`/accommodations`, { method: 'POST' }, token, accommodationData),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['accommodations'] })
    },
  })
}
