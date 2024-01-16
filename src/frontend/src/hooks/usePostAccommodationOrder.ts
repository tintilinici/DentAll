import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { AccommodationOrderPostDTO } from '../lib/api.types'
import { useAuth } from '../components/auth/useAuth'

export const usePostAccommodationOrder = (patientId: string) => {
  const queryClient = useQueryClient()
  const { token } = useAuth()

  return useMutation({
    mutationKey: ['postAccommodationOrder'],
    mutationFn: (accommodationData: AccommodationOrderPostDTO) =>
      customFetch('/patients/orders', { method: 'POST' }, token, accommodationData),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['patientsOrders', patientId] })
    },
  })
}
