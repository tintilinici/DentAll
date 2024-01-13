import { useMutation } from '@tanstack/react-query'
import { customFetch } from '../lib/customFetch'
import { TLoginData } from '../components/auth/authTypes'

export const usePostLoginAdmin = () => {
  return useMutation({
    mutationKey: ['postLoginAdmin'],
    mutationFn: (loginData: TLoginData) => {
      return customFetch<{ accessToken: string }>(
        `/security/login?email=${loginData.email}&password=${loginData.password}`,
        { method: 'POST' }
      )
    },
  })
}
