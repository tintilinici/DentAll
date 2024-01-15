import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { PatientPostDTO } from '../lib/api.types'
import { useAuth } from '../components/auth/useAuth'

export const usePostPatient = () => {
  const queryClient = useQueryClient()
  const { token } = useAuth()

  return useMutation({
    mutationKey: ['postPatient'],
    mutationFn: (patientData: PatientPostDTO) =>
      customFetch('/patients', { method: 'POST' }, token, patientData),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['patients'] })
    },
  })
}
