import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { ROLE, roleDefaultRoutes } from './authTypes'
import { useAuth } from './useAuth'

interface Props {
  allowRoles: ROLE[] | 'any'
}

const ProtectedRoute = ({ children, allowRoles }: PropsWithChildren<Props>) => {
  const { isAuthenticated, userData } = useAuth()

  if (!isAuthenticated) {
    return (
      <Navigate
        to='/login'
        replace
      />
    )
  } else if (allowRoles !== 'any' && !allowRoles.includes(userData.role)) {
    // FIXME: fix the flasing before redirecting, the page tries to load before redirecting
    // mby use somekind of loader to check the role and then redirect before render
    return (
      <Navigate
        to={roleDefaultRoutes[userData.role]}
        replace
      />
    )
  } else {
    return children
  }
}

export default ProtectedRoute
