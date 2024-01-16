import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { Accommodation } from '../lib/api.types'
import { useAuth } from '../components/auth/useAuth'

export const usePutAccommodation = () => {
  const queryClient = useQueryClient()
  const { token } = useAuth()

  return useMutation({
    mutationKey: ['putAccommodation'],
    mutationFn: (accommodationData: Accommodation) =>
      customFetch(
        `/accommodations/${accommodationData.id}`,
        { method: 'PUT' },
        token,
        accommodationData
      ),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['accommodations'] })
    },
  })
}
