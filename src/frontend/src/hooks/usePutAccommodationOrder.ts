import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { useAuth } from '../components/auth/useAuth'
import { AccommodationOrderPostDTO } from '../lib/api.types'

export const usePutAccommodationOrder = (patientId: string, orderId: string) => {
  const queryClient = useQueryClient()
  const { token } = useAuth()

  return useMutation({
    mutationKey: ['deleteAccommodationOrder'],
    mutationFn: (accommodationData: AccommodationOrderPostDTO) =>
      customFetch(`/patients/orders/${orderId}`, { method: 'PUT' }, token, accommodationData),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['accommodationOrders', patientId] })
    },
  })
}
