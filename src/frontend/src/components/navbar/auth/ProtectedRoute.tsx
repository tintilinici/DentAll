import { PropsWithChildren, useContext } from 'react'
import { AuthContext, roleDefaultRoutes } from './AuthProvider'
import { Navigate } from 'react-router-dom'
import { ROLE } from './AuthProvider'

interface Props {
  allowRoles: ROLE[] | 'any'
}

const ProtectedRoute = ({ children, allowRoles }: PropsWithChildren<Props>) => {
  const { isAuthenticated, userData } = useContext(AuthContext)

  if (!isAuthenticated) {
    return (
      <Navigate
        to='/login'
        replace
      />
    )
  } else if (allowRoles !== 'any' && !allowRoles.includes(userData.role)) {
    // TODO: redirect the role to it's matching dashboard if they try to acces a page they don't have access to

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
