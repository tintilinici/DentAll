import { useQuery } from '@tanstack/react-query'
import { useCustomFetch } from './useCustomFetch'
import { AccommodationOrder } from '../lib/api.types'

export const useGetAccommodationOrders = (patientId: string) => {
  const customFetch = useCustomFetch()

  return useQuery({
    queryFn: () => customFetch<AccommodationOrder[]>(`/patients/orders?patientId=${patientId}`),
    queryKey: ['accommodationOrders', patientId],
  })
}
