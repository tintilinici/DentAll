import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthProvider, { ROLE } from './components/auth/AuthProvider'
import NoAuthOnlyRoute from './components/auth/NoAuthOnlyRoute'
import ProtectedRoute from './components/auth/ProtectedRoute'
import routes from './constants/routes'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import AllTransportCompaniesPage from './pages/transportAdminPages/AllTransportCompaniesPage'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import TransportCompanyDetailsPage from './pages/transportAdminPages/TransportCompanyDetailsPage'
import UserAdminDashboard from './pages/userAdminPages/UserAdminDashboard'
import AccommodationAdminDashboardPage from './pages/accommodationAdminPages/AccommodationAdminDashboard'

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
    path: routes.TRANSPORT_COMPANIES,
    element: (
      <ProtectedRoute allowRoles={[ROLE.TRANSPORT_ADMIN]}>
        <AllTransportCompaniesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: `${routes.TRANSPORT_COMPANIES}/:id`,
    element: <TransportCompanyDetailsPage />,
  },

  // user admin routes
  {
    path: routes.USERS,
    element: (
      <ProtectedRoute allowRoles={[ROLE.USER_ADMIN]}>
        <UserAdminDashboard />
      </ProtectedRoute>
    ),
  },

  // accommodation admin routes
  {
    path: routes.ACCOMMODATION,
    element: <AccommodationAdminDashboardPage />,
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
