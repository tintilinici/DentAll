import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Accommodation } from '../lib/api.types'
import { useCustomFetch } from './useCustomFetch'

export const usePostAccommodation = () => {
  const queryClient = useQueryClient()
  const customFetch = useCustomFetch()

  return useMutation({
    mutationKey: ['postAccommodation'],
    mutationFn: (accommodationData: Accommodation) => {
      return customFetch(`/accommodations`, { method: 'POST' }, accommodationData)
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['accommodations'] })
    },
  })
}
