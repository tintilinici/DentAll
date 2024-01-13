import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthProvider from './components/auth/AuthProvider'
import NoAuthOnlyRoute from './components/auth/NoAuthOnlyRoute'
import ProtectedRoute from './components/auth/ProtectedRoute'
import routes from './constants/routes'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import AllTransportCompaniesPage from './pages/transportAdmin/AllTransportCompaniesPage'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import TransportCompanyDetailsPage from './pages/transportAdmin/TransportCompanyDetailsPage'
import UserAdminDashboard from './pages/userAdmin/UserAdminDashboardPage'
import AccommodationAdminDashboardPage from './pages/accommodationAdmin/AccommodationAdminDashboard'
import AdminsManagmentPage from './pages/userAdmin/AdminsManagmentPage'
import { ROLE } from './components/auth/authTypes'
import AccommodationDetailsPage from "./pages/accommodationAdmin/AccommodationDetailsPage.tsx";

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
      <ProtectedRoute allowRoles={[ROLE.ROLE_TRANSPORT]}>
        <AllTransportCompaniesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: `${routes.TRANSPORT_COMPANIES}/:id`,
    element: (
      <ProtectedRoute allowRoles={[ROLE.ROLE_TRANSPORT]}>
        <TransportCompanyDetailsPage />
      </ProtectedRoute>
    ),
  },

  // user admin routes
  {
    path: routes.USERS.DASHBOARD,
    element: (
      <ProtectedRoute allowRoles={[ROLE.ROLE_PATIENT]}>
        <UserAdminDashboard />
      </ProtectedRoute>
    ),
  },

  // accommodation admin routes
  {
    path: routes.ACCOMMODATION,
    element: (
      <ProtectedRoute allowRoles={[ROLE.ROLE_ACCOMMODATION]}>
        <AccommodationAdminDashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: `${routes.ACCOMMODATION}/:id`,
    element: (
      <ProtectedRoute allowRoles={[ROLE.ROLE_ACCOMMODATION]}>
        <AccommodationDetailsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: routes.USERS.ADMIN_MANAGMENT,
    element: (
      <ProtectedRoute allowRoles={[ROLE.ROLE_ACCOMMODATION]}>
        <AdminsManagmentPage />
      </ProtectedRoute>
    ),
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
