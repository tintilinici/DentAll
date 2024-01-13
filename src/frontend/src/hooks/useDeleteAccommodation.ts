import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { useAuth } from '../components/auth/useAuth'

export const useDeleteAccommodationMutation = () => {
    const queryClient = useQueryClient()
    const { token } = useAuth()

    return useMutation({
        mutationKey: ['deleteAccommodation'],
        mutationFn: (accommodationId: string) =>
            customFetch(
                `/accommodations/${accommodationId}`,
                { method: 'DELETE', interesedInData: false },
                token
            ),
        onSuccess: () => {
            return queryClient.invalidateQueries({ queryKey: ['accommodations'] })
        },
    })
}
