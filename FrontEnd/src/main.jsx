import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DosisFont from "../Fonts/Dosis/Dosis-VariableFont_wght.ttf";
import App from "./App";
import DashBoard from "./components/DashBoard/dashboard";
import LogIn from "./components/Login/login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import SignUp from "./components/SignUp/signup";
import { AuthProvider } from "./context/AuthContext";
// import "./index.css";
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: "#238737",
    },
    secondary: {
      main: "#4078c0",
    },
  },
  typography: { fontFamily: "Dosis, Arial, sans-serif" },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Dosis';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Dosis'), url(${DosisFont}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});

function ThemedApp() {
  const [mode, setMode] = React.useState("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/*"
                element={
                  <App
                    mode={mode}
                    toggleColorMode={colorMode.toggleColorMode}
                  />
                }
              />
              <Route
                path="/signup"
                element={
                  <SignUp
                    mode={mode}
                    toggleColorMode={colorMode.toggleColorMode}
                  />
                }
              />
              <Route
                path="/login"
                element={
                  <LogIn
                    mode={mode}
                    toggleColorMode={colorMode.toggleColorMode}
                  />
                }
              />
              {/* <Route path="/tests" element={<CADViewer />} /> */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashBoard
                      mode={mode}
                      toggleColorMode={colorMode.toggleColorMode}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </CssBaseline>
    </ThemeProvider>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemedApp />
  </React.StrictMode>
);
