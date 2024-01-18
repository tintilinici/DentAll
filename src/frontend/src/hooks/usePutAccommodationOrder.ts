import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AccommodationOrderPostDTO } from '../lib/api.types'
import { useCustomFetch } from './useCustomFetch'

export const usePutAccommodationOrder = (patientId: string, orderId: string) => {
  const queryClient = useQueryClient()
  const customFetch = useCustomFetch()

  return useMutation({
    mutationKey: ['deleteAccommodationOrder'],
    mutationFn: (accommodationData: AccommodationOrderPostDTO) =>
      customFetch(`/patients/orders/${orderId}`, { method: 'PUT' }, accommodationData),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['accommodationOrders', patientId] })
    },
  })
}
