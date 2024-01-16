import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { useAuth } from '../components/auth/useAuth'

export const useDeleteAccommodationOrder = (patientId: string) => {
  const queryClient = useQueryClient()
  const { token } = useAuth()

  return useMutation({
    mutationKey: ['deleteAccommodationOrder'],
    mutationFn: (orderId: string) =>
      customFetch(
        `/patients/orders/${orderId}`,
        { method: 'DELETE', interesedInData: false },
        token
      ),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['accommodationOrders', patientId] })
    },
  })
}
