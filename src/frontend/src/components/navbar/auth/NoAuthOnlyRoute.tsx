import { PropsWithChildren, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const NoAuthOnlyRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useContext(AuthContext);

  // TODO DOESN'T WORK YES
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default NoAuthOnlyRoute;
