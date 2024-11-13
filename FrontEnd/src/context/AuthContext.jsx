import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserControllerService } from "../middleware-api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await UserControllerService.validateToken(
            `Bearer ${token}`
          );
          if (userData && userData.email) {
            setUser({
              email: userData.email,
              username: userData.username,
            });
          } else {
            // Token response is invalid
            handleLogout();
          }
        } catch (error) {
          // Only logout for auth errors
          if (error.response?.status === 401) {
            handleLogout();
          }
          // For other errors, keep the existing session
          console.error("Token validation error:", error);
        }
      }
    };

    validateToken();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("userEmail", userData.email);
    localStorage.setItem("username", userData.username);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("username");
    setUser(null);
    navigate("/login");
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout: handleLogout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
