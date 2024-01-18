import { useQuery } from '@tanstack/react-query'
import { useCustomFetch } from './useCustomFetch'
import { Accommodation } from '../lib/api.types'

export const useGetAccommodationsByOrder = (orderId: string, radius: number) => {
  const customFetch = useCustomFetch()

  return useQuery({
    queryFn: () =>
      customFetch<Accommodation[]>(
        `/accommodations/get-by-order?orderId=${orderId}&radius=${radius}`,
        { method: 'GET' }
      ),
    queryKey: ['accomodationsByOrder', orderId, radius],
    retry: false,
  })
}
