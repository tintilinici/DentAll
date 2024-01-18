import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthProvider from './components/auth/AuthProvider'
import NoAuthOnlyRoute from './components/auth/NoAuthOnlyRoute'
import ProtectedRoute from './components/auth/ProtectedRoute'
import routes from './constants/routes'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import TransportAdminDashboardPage from './pages/transportAdmin/TransportAdminDashboardPage.tsx'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import TransportCompanyDetailsPage from './pages/transportAdmin/TransportCompanyDetailsPage'
import PatientAdminDashboard from './pages/patientAdmin/PatientAdminDashboardPage'
import AccommodationAdminDashboardPage from './pages/accommodationAdmin/AccommodationAdminDashboardPage.tsx'
import AdminsManagmentPage from './pages/accommodationAdmin/AdminsManagmentPage'
import { ROLE } from './components/auth/authTypes'
import AccommodationDetailsPage from './pages/accommodationAdmin/AccommodationDetailsPage.tsx'
import AccommodationOrdersPage from './pages/patientAdmin/AccommodationOrdersPage.tsx'

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
        <TransportAdminDashboardPage />
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

  // patient admin routes
  {
    path: routes.USERS.DASHBOARD,
    element: (
      <ProtectedRoute allowRoles={[ROLE.ROLE_PATIENT]}>
        <PatientAdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: `${routes.USERS.DASHBOARD}/orders/:id`,
    element: (
      <ProtectedRoute allowRoles={[ROLE.ROLE_PATIENT]}>
        <AccommodationOrdersPage />
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
