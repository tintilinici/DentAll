import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'

export const useDeletePatientMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deletePatient'],
    mutationFn: (patientId: string) =>
      customFetch(`patients/${patientId}`, { method: 'DELETE', interesedInData: false }),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['patients'] })
    },
  })
}
