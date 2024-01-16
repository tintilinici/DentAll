import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { useAuth } from '../components/auth/useAuth'

export const useDeletePatientMutation = () => {
  const queryClient = useQueryClient()
  const { token } = useAuth()

  return useMutation({
    mutationKey: ['deletePatient'],
    mutationFn: (patientId: string) =>
      customFetch(`/patients/${patientId}`, { method: 'DELETE', interesedInData: false }, token),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['patients'] })
    },
  })
}
