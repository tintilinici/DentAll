import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCustomFetch } from './useCustomFetch'

export const useDeleteAccommodationMutation = () => {
  const queryClient = useQueryClient()
  const customFetch = useCustomFetch()

  return useMutation({
    mutationKey: ['deleteAccommodation'],
    mutationFn: (accommodationId: string) =>
      customFetch(`/accommodations/${accommodationId}`, {
        method: 'DELETE',
        interesedInData: false,
      }),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['accommodations'] })
    },
  })
}
