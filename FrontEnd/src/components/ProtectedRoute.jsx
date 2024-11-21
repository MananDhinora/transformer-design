import PropTypes from "prop-types";
import { memo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import tokenService from "../middleware-api/token/tokenService";
import useStore from "../stores/Store";

const ProtectedRoute = memo(({ children }) => {
  const location = useLocation();
  const user = useStore((state) => state.user);
  const isTokenValid = tokenService.isTokenValid();

  if (!user || !isTokenValid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
});

ProtectedRoute.displayName = "ProtectedRoute";

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ProtectedRoute };
