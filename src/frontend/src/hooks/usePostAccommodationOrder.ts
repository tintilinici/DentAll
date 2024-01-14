import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { AccommodationOrderPostDTO } from '../lib/api.types'

export const usePostAccommodationOrder = (patientId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['postAccommodationOrder'],
    mutationFn: (accommodationData: AccommodationOrderPostDTO) =>
      customFetch('patients/orders', { method: 'POST' }, accommodationData),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['patientsOrders', patientId] })
    },
  })
}
