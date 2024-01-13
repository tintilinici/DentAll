import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

const NoAuthOnlyRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return (
      <Navigate
        to='/transport-companies'
        replace
      />
    )
  }

  return children
}

export default NoAuthOnlyRoute
