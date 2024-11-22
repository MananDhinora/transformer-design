import PropTypes from "prop-types";
import { memo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import tokenService from "../middleware-api/token/tokenService";
import useStore from "../stores/Store";

const ProtectedRoute = memo(({ children }) => {
  const location = useLocation();
  const user = useStore((state) => state.user);
  const token = useStore((state) => state.token);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);

  console.log("PROTECTED ROUTE CHECK", {
    user: user ? JSON.stringify(user) : "No user",
    token: token ? "Token exists" : "No token",
    loading,
    error,
    tokenValid: tokenService.isTokenValid(),
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.warn("PROTECTED ROUTE ERROR:", error);
    tokenService.clearToken();
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user || !token || !tokenService.isTokenValid()) {
    console.log("ACCESS DENIED. REDIRECTING TO LOGIN");
    tokenService.clearToken();
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
});
ProtectedRoute.displayName = "ProtectedRoute";

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ProtectedRoute };
