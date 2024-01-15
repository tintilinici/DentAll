import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../components/auth/useAuth'
import { customFetch } from '../lib/customFetch'
import { Accommodation } from '../lib/api.types'

export const useGetAccommodationDetails = (id: string) => {
  const { token } = useAuth()

  return useQuery({
    queryFn: () => customFetch<Accommodation>(`/accommodations/${id}`, {}, token),
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['accommodations', id],
  })
}
