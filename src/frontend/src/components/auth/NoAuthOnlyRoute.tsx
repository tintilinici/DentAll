import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

const NoAuthOnlyRoute = ({ children }: PropsWithChildren) => {
  const { token } = useAuth()

  if (token) {
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
