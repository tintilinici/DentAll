import { useQuery } from '@tanstack/react-query'
import { Patient } from '../lib/api.types'
import { useCustomFetch } from './useCustomFetch'

export const useGetPatients = () => {
  const customFetch = useCustomFetch()

  return useQuery({
    queryFn: () => customFetch<Patient[]>('/patients'),
    queryKey: ['patients'],
  })
}
