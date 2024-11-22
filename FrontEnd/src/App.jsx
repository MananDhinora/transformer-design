/**
 * The main entry point of the React application.
 * Handles routing, authentication, and loading state.
 */

import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./components/DashBoard/dashboard";
import Home from "./components/Home/home";
import Login from "./components/Login/login";
import NavBar from "./components/NavBar/navbar";
import NotFound from "./components/NotFound/NotFound";
import SignUp from "./components/SignUp/signup";
import tokenService from "./middleware-api/token/tokenService";
import useStore from "./stores/Store";

function App() {
  const autoLogin = useStore((state) => state.autoLogin);
  const [autoLoginAttempted, setAutoLoginAttempted] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const user = useStore((state) => state.user);
  const token = useStore((state) => state.token);
  const loading = useStore((state) => state.loading);

  useEffect(() => {
    let mounted = true;

    const attemptAutoLogin = async () => {
      try {
        const token = tokenService.token;

        if (!token) {
          if (mounted) {
            setAutoLoginAttempted(true);
          }
          return;
        }

        if (!tokenService.isTokenValid()) {
          tokenService.clearToken();
          if (mounted) {
            setAutoLoginAttempted(true);
          }
          return;
        }

        const success = await autoLogin();

        if (mounted) {
          if (!success) {
            tokenService.clearToken();
            setLoginError("Auto-login failed");
          }

          setAutoLoginAttempted(true);
        }
      } catch (error) {
        if (mounted) {
          tokenService.clearToken();
          setLoginError(error.message || "Auto-login failed");
          setAutoLoginAttempted(true);
        }
      }
    };

    // Only attempt auto-login if not already attempted and no user
    if (!autoLoginAttempted && !user) {
      attemptAutoLogin();
    } else {
      setAutoLoginAttempted(true);
    }

    return () => {
      mounted = false;
    };
  }, [autoLogin, autoLoginAttempted, user]);

  // Render loading state
  if (!autoLoginAttempted || loading) {
    return (
      <div>
        <p>Loading...</p>
        {loginError && <p>Error: {loginError}</p>}
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            user && token && tokenService.isTokenValid() ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        {/* <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>a
            <Settings />
          </ProtectedRoute>
        } /> */}

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
