import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { PatientPostDTO } from '../lib/api.types'

export const usePostPatient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['postPatient'],
    mutationFn: (companyData: PatientPostDTO) =>
      customFetch('patients', { method: 'POST' }, companyData),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['patients'] })
    },
  })
}
