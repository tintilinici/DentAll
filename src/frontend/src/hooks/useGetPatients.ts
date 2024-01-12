import { useQuery } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { Patient } from '../lib/api.types'

export const useGetPatients = () => {
  return useQuery({
    queryFn: () => customFetch<Patient[]>('patients'),
    queryKey: ['patients'],
  })
}
