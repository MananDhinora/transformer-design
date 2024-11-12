import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import PropTypes from "prop-types";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
