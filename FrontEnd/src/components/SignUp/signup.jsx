import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function SignUp() {
  //   const navigate = useNavigate();

  const signup = useStore((state) => state.signup);
  const [signupRequest, setSignupRequest] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState([]);
  const navigate = useNavigate();

  const [toAccepted, setTOSAccepted] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleTOSChange = (event) => {
    setTOSAccepted(event.target.checked);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Signup attempt:", signupRequest);

    try {
      await signup(
        signupRequest.email,
        signupRequest.password,
        signupRequest.username
      );
      console.log("Signup successful");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMsg([
        error.status === 409
          ? "An account with this email or username already exists"
          : error.message || "Signup failed",
      ]);
    }
  };
  return (
    <>
      {/* <NavBar mode={mode} toggleColorMode={toggleColorMode} /> */}
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
              Sign up
            </Typography>
            {errorMsg.length > 0 && (
              <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
                {errorMsg.map((msg, index) => (
                  <p key={index}>{msg}</p>
                ))}
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
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                autoFocus
                value={signupRequest.username}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={signupRequest.email}
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
                autoComplete="new-password"
                value={signupRequest.password}
                onChange={handleInputChange}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="allowTOS"
                    color="primary"
                    onChange={handleTOSChange}
                    checked={toAccepted}
                  />
                }
                label="I agree to all TOS."
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!toAccepted}
              >
                Sign Up
              </Button>
              <Box sx={{ textAlign: "center" }}>
                <Link href="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Box>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Box>
    </>
  );
}
