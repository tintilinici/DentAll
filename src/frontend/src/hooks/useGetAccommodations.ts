import { useQuery } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { Accommodation } from '../lib/api.types'
import { useAuth } from '../components/auth/useAuth'

export const useGetAccommodations = () => {
  const { token } = useAuth()

  return useQuery({
    queryFn: () => customFetch<Accommodation[]>('/accommodations', {}, token),

    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['accommodations'],
  })
}
