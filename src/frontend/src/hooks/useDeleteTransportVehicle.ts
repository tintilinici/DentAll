import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { useAuth } from '../components/auth/useAuth'

export const useDeleteTransportVehicle = (companyId: string) => {
  const queryClient = useQueryClient()
  const { token } = useAuth()

  return useMutation({
    mutationKey: ['deleteTransportVehicle'],
    mutationFn: (vehicleId: string) =>
      customFetch(
        `/transportVehicles/${vehicleId}`,
        { method: 'DELETE', interesedInData: false },
        token
      ),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['transportComapnyDetails', companyId] })
    },
    onError: (error) => {
      console.log(error)
    },
  })
}
