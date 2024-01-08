import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthProvider from './components/navbar/auth/AuthProvider'
import NoAuthOnlyRoute from './components/navbar/auth/NoAuthOnlyRoute'
import ProtectedRoute from './components/navbar/auth/ProtectedRoute'
import routes from './constants/routes'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import AllTransportCompaniesPage from './pages/transportAdminPages/AllTransportCompaniesPage'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import TransportCompanyDetailsPage from './pages/transportAdminPages/TransportCompanyDetailsPage'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: routes.LANDING,
    element: <LandingPage />,
    errorElement: <h1>4 oh 4</h1>,
  },
  {
    path: routes.AUTH.LOGIN,
    element: (
      <NoAuthOnlyRoute>
        <LoginPage />
      </NoAuthOnlyRoute>
    ),
  },
  {
    path: routes.TRANSPORT.COMPANIES,
    element: (
      <ProtectedRoute>
        <AllTransportCompaniesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: `${routes.TRANSPORT.COMPANIES}/:id`,
    element: <TransportCompanyDetailsPage />,
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
