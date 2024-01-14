import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { TransportVehiclePostDTO } from '../lib/api.types'
import { useAuth } from '../components/auth/useAuth'

export const usePostTransportVehicle = (companyId: string) => {
  const queryClient = useQueryClient()
  const { token } = useAuth()

  return useMutation({
    mutationKey: ['postTransportVehicle'],
    mutationFn: (transportVehicleData: TransportVehiclePostDTO) =>
      customFetch('/transportVehicles', { method: 'POST' }, token, transportVehicleData),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['transportComapnyDetails', companyId] })
    },
  })
}
