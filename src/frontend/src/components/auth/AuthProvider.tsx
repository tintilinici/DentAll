import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { ROLE, TLoginData, TUserData } from './authTypes'
import { jwtDecode } from 'jwt-decode'
import { usePostLoginAdmin } from '../../hooks/usePostLoginAdmin'
import { useToast } from '@chakra-ui/react'
import { JwtPayload } from '../../lib/api.types'

type IAuthContext = {
  token: string
  userData: TUserData
  isFetchingToken: boolean

  getRoles: () => ROLE[]
  login: (loginData: TLoginData, onSuccess: () => void) => void
  logout: (onSuccess?: () => void) => void
}

export const AuthContext = createContext<IAuthContext>(null!)

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<IAuthContext['token']>('')
  const [userData, setUserData] = useState<TUserData>(null!)
  const [isFetchingToken, setIsFetchingToken] = useState(true)

  const loginMutation = usePostLoginAdmin()
  const toast = useToast()

  useEffect(() => {
    const lsToken = localStorage.getItem('token')
    if (lsToken) {
      setToken(lsToken)
    }
    setIsFetchingToken(false)
  }, [])

  const getRoles = () => {
    let userRoles
    try {
      userRoles = jwtDecode<JwtPayload>(token).roles
    } catch (e) {
      return []
    }
    return userRoles.sort()
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

  const logout = (onSuccess?: () => void) => {
    setToken('')
    setUserData(null!)
    localStorage.removeItem('token')
    onSuccess && onSuccess()
  }

  const value = {
    userData,
    logout,
    token,
    isFetchingToken,
    login,
    setToken,
    getRoles,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
