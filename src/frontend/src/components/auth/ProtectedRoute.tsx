import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { ROLE, roleDefaultRoutes } from './authTypes'
import { useAuth } from './useAuth'

interface Props {
  allowRoles: ROLE[]
}

const ProtectedRoute = ({ children, allowRoles }: PropsWithChildren<Props>) => {
  const { token, getRoles, isFetchingToken } = useAuth()

  if (!token && !isFetchingToken) {
    return (
      <Navigate
        to='/login'
        replace
      />
    )
  }

  // test to see if curent user has any of the roles that are allowed to access this route
  if (getRoles().some((role) => allowRoles.includes(role))) {
    return children
  }

  return (
    <Navigate
      to={roleDefaultRoutes[getRoles()[0]]}
      replace
    />
  )
}

export default ProtectedRoute
