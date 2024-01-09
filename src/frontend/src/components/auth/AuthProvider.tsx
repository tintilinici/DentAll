import { createContext, PropsWithChildren, useState } from 'react'
import routes from '../../constants/routes'

export enum ROLE {
  USER_ADMIN = 'user_admin',
  TRANSPORT_ADMIN = 'transport_admin',
  ACCOMMODATION_ADMIN = 'accommodation_admin',
}

// TODO: add the default route for each role so that it can be used in ProtectedRoute.tsx
// and when logging in redirect the user to their default route
export const roleDefaultRoutes = {
  [ROLE.USER_ADMIN]: routes.USERS,
  [ROLE.TRANSPORT_ADMIN]: routes.TRANSPORT_COMPANIES,
  [ROLE.ACCOMMODATION_ADMIN]: routes.ACCOMMODATION,
}

type TUserData = {
  firstName: string
  lastName: string
  email: string
  role: ROLE
}

type TLoginData = {
  email: string
  password: string
}

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
