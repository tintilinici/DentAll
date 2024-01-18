import { useQuery } from '@tanstack/react-query'
import { useCustomFetch } from './useCustomFetch'
import { Accommodation } from '../lib/api.types'

export const useGetAccommodationsByOrder = (orderId: string, radius: number) => {
  const customFetch = useCustomFetch()

  return useQuery({
    queryFn: (radius) =>
      customFetch<Accommodation[]>(
        `accommodations/get-by-order?orderId=${orderId}&radius=${radius}`
      ),
    queryKey: ['accomodationsByOrder', orderId, radius],
  })
}
