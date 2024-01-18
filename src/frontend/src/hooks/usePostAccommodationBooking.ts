import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCustomFetch } from './useCustomFetch'

export const usePostAccommodationBooking = (patientId: string, accommodationOrderId: string) => {
  const queryClient = useQueryClient()
  const customFetch = useCustomFetch()

  return useMutation({
    mutationKey: ['postAccommodationBooking'],
    mutationFn: (accommodationId: string) =>
      customFetch('/bookings', { method: 'POST' }, { accommodationOrderId, accommodationId }),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['accommodationOrders', patientId] })
    },
  })
}
