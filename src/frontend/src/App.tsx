import LandingPage from "./pages/LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AllTransportCompaniesPage from "./pages/transportAdminPages/AllTransportCompaniesPage";
import routes from "./constants/routes";
import AuthProvider from "./components/navbar/auth/AuthProvider";
import ProtectedRoute from "./components/navbar/auth/ProtectedRoute";
import NoAuthOnlyRoute from "./components/navbar/auth/NoAuthOnlyRoute";

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
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />;
    </AuthProvider>
  );
}

export default App;
