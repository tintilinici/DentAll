import { useQuery } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { User } from '../lib/api.types'
import { useAuth } from '../components/auth/useAuth'

export const useGetUsers = () => {
  const { token } = useAuth()

  return useQuery({
    queryFn: () => customFetch<User[]>('/security/users', {}, token),

    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['users'],
  })
}
