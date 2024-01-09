import { createContext, PropsWithChildren, useState } from 'react'
import { ROLE, TLoginData, TUserData } from './authTypes'

type IAuthContext = {
  isAuthenticated: boolean
  token: string
  userData: TUserData

  login: (data: TLoginData) => void
  logout: () => void
  getFullName: () => string
}
export const AuthContext = createContext<IAuthContext>(null!)

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [token, setToken] = useState<string>('')
  const [userData, setUserData] = useState<TUserData>(null!)

  const login = (loginData: TLoginData) => {
    console.log(loginData)
    setToken('token')
    setUserData({
      firstName: 'Marko',
      lastName: 'Markić',
      email: 'marko.markic@gmail.com',
      role: ROLE.TRANSPORT_ADMIN,
    })
    setIsAuthenticated(true)
    return
  }

  const logout = () => {
    setIsAuthenticated(false)
    setToken('')
    setUserData(null!)
  }

  const getFullName = () => {
    return userData.firstName + ' ' + userData.lastName
  }

  const value = {
    isAuthenticated,
    token,
    userData,
    login,
    logout,
    getFullName,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
