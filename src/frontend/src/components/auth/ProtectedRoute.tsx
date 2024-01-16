import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { ROLE, roleDefaultRoutes } from './authTypes'
import { useAuth } from './useAuth'

interface Props {
  allowRoles: ROLE[]
}

const ProtectedRoute = ({ children, allowRoles }: PropsWithChildren<Props>) => {
  const { token, getRoles } = useAuth()

  if (!token) {
    return (
      <Navigate
        to='/login'
        replace
      />
    )
  } else if (
    getRoles().some((role) => {
      allowRoles.includes(role)
    })
  ) {
    return (
      <Navigate
        to={roleDefaultRoutes[getRoles()[0]]}
        replace
      />
    )
  } else {
    return children
  }
}

export default ProtectedRoute
