import { useQuery } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { Patient } from '../lib/api.types'
import { useAuth } from '../components/auth/useAuth'

export const useGetPatients = () => {
  const { token } = useAuth()

  return useQuery({
    queryFn: () => customFetch<Patient[]>('/patients', {}, token),
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['patients'],
  })
}
