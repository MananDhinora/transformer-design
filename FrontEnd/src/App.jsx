import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/DashBoard/dashboard";
import Home from "./components/Home/home";
import Login from "./components/Login/login";
import NavBar from "./components/NavBar/navbar";
import NotFound from "./components/NotFound/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import SignUp from "./components/SignUp/signup";
import useStore from "./stores/Store";

function App() {
  const validateToken = useStore((state) => state.validateToken);

  useEffect(() => {
    console.log("App: Initial token validation");
    validateToken();
  }, [validateToken]);

  return (
    <>
      <NavBar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
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
