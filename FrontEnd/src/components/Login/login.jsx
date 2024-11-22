import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
// import useAuthStore from "../../stores/authStore";
import { useState } from "react";
import useStore from "../../stores/Store";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default function Login() {
  const navigate = useNavigate();
  const login = useStore((state) => state.login);
  const error = useStore((state) => state.error);
  const [isLoading, setIsLoading] = useState(false);

  const [authRequest, setAuthRequest] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input Change - ${name}: ${value}`);
    setAuthRequest((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Login form submitted with:", authRequest);
    console.log("Login attempt:", authRequest.email, authRequest.password);
    setIsLoading(true);

    try {
      const response = await login(authRequest.email, authRequest.password);
      console.log("Login response:", response); // Log the response
      const from = location.state?.from?.pathname || "/dashboard";
      console.log("Login successful, navigating to:", from);
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box component="main" sx={{ pt: 8 }}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "400px",
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          {error && (
            <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
              {error}
            </Alert>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={authRequest.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={authRequest.password}
              onChange={handleInputChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Box sx={{ textAlign: "center" }}>
              <Link href="/signup" variant="body2">
                Don't have an account yet? Sign Up
              </Link>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Link href="/" variant="body2">
                Forgot password ?
              </Link>
            </Box>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </Box>
  );
}
// Props validation
