import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { roleDefaultRoutes } from './authTypes'

const NoAuthOnlyRoute = ({ children }: PropsWithChildren) => {
  const { token, getRoles } = useAuth()

  if (token) {
    return (
      <Navigate
        to={roleDefaultRoutes[getRoles()[0]]}
        replace
      />
    )
  }

  return children
}

export default NoAuthOnlyRoute
