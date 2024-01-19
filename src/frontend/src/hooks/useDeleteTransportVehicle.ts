import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCustomFetch } from './useCustomFetch'

export const useDeleteTransportVehicle = (companyId: string) => {
  const queryClient = useQueryClient()
  const customFetch = useCustomFetch()

  return useMutation({
    mutationKey: ['deleteTransportVehicle'],
    mutationFn: (vehicleId: string) =>
      customFetch(`/transportVehicles/${vehicleId}`, { method: 'DELETE', interesedInData: false }),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['transportComapnyDetails', companyId] })
    },
    onError: (error) => {
      console.log(error)
    },
  })
}
