import { PropsWithChildren, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const NoAuthOnlyRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Navigate to="/transport-companies" replace />;
  }

  return children;
};

export default NoAuthOnlyRoute;
