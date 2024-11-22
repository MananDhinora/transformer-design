import PropTypes from "prop-types";
import { memo } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import tokenService from "../middleware-api/token/tokenService";
import useStore from "../stores/Store";

const ProtectedRoute = memo(({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const token = useStore((state) => state.token);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.warn("PROTECTED ROUTE ERROR:", error);
    tokenService.clearToken();
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user || !token || !tokenService.isTokenValid()) {
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
