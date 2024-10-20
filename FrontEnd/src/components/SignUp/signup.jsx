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
import PropTypes from "prop-types";
import { useState } from "react";
import NavBar from "../NavBar/navbar";
// import { useNavigate } from "react-router-dom";
// import { AuthControllerService } from "../../api-client";

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

export default function SignUp({ mode, toggleColorMode }) {
  //   const navigate = useNavigate();
  const [signupRequest, setSignupRequest] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupRequest((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg([]);

    try {
      //   const response = await AuthControllerService.registerUser(signupRequest);
      //   console.log("Registration successful:", response);
      //   navigate("/activate-account", { state: { email: signupRequest.email } });
    } catch (error) {
      console.error("Registration failed:", error);
      if (error.response?.data) {
        if (error.response.data.validationErrors) {
          setErrorMsg(error.response.data.validationErrors);
        } else {
          setErrorMsg([error.response.data.errorMsg]);
        }
      } else {
        setErrorMsg(["An unexpected error occurred"]);
      }
    }
  };
  return (
    <>
      <NavBar mode={mode} toggleColorMode={toggleColorMode} />
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
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I agree to all TOS."
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Box sx={{ textAlign: "center" }}>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
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
// Props validation
SignUp.propTypes = {
  mode: PropTypes.oneOf(["light", "dark"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};
