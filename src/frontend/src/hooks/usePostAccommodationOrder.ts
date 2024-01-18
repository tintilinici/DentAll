import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AccommodationOrderPostDTO } from '../lib/api.types'
import { useCustomFetch } from './useCustomFetch'

export const usePostAccommodationOrder = (patientId: string) => {
  const queryClient = useQueryClient()
  const customFetch = useCustomFetch()

  return useMutation({
    mutationKey: ['postAccommodationOrder'],
    mutationFn: (accommodationData: AccommodationOrderPostDTO) =>
      customFetch('/patients/orders', { method: 'POST' }, accommodationData),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['patientsOrders', patientId] })
    },
  })
}
