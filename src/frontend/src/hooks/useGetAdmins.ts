import { useQuery } from '@tanstack/react-query'
import { User } from '../lib/api.types'
import { useCustomFetch } from './useCustomFetch'

export const useGetUsers = () => {
  const customFetch = useCustomFetch()

  return useQuery({
    queryFn: () => customFetch<User[]>('/security/users', {}),
    queryKey: ['users'],
  })
}
