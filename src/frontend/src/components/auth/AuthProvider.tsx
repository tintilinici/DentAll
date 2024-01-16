import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { ROLE, TLoginData, TUserData } from './authTypes'
import { jwtDecode } from 'jwt-decode'
import { usePostLoginAdmin } from '../../hooks/usePostLoginAdmin'
import { useToast } from '@chakra-ui/react'
import { JwtPayload } from '../../lib/api.types'

type IAuthContext = {
  token: string
  userData: TUserData

  getRoles: () => ROLE[]
  login: (loginData: TLoginData, onSuccess: () => void) => void
  logout: () => void
}

export const AuthContext = createContext<IAuthContext>(null!)

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<IAuthContext['token']>('')
  const [userData, setUserData] = useState<TUserData>(null!)

  const loginMutation = usePostLoginAdmin()
  const toast = useToast()

  useEffect(() => {
    const lsToken = localStorage.getItem('token')
    if (lsToken) {
      setToken(lsToken)
    }
  }, [])

  const getRoles = () => {
    const userRoles = jwtDecode<JwtPayload>(token).roles
    return userRoles
  }

  const login = (loginData: TLoginData, onSuccess: () => void) => {
    loginMutation.mutate(loginData, {
      onSuccess: (data) => {
        setToken(data.accessToken)
        localStorage.setItem('token', data.accessToken)
        onSuccess()
      },
      onError: (error) => {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      },
    })
  }

  const logout = () => {
    setToken('')
    setUserData(null!)
    localStorage.removeItem('token')
  }

  const value = {
    userData,
    logout,
    token,
    login,
    setToken,
    getRoles,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
