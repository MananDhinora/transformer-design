import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HomeIcon from "@mui/icons-material/Home";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function NotFound() {
  const theme = useTheme();

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 5,
            borderRadius: 4,
            background:
              theme.palette.mode === "light"
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <ErrorOutlineIcon
            sx={{
              fontSize: 120,
              color: theme.palette.primary.main,
              mb: 2,
              filter: "drop-shadow(0 0 8px rgba(35, 135, 55, 0.3))",
            }}
          />

          <Typography
            variant="h1"
            sx={{
              fontSize: "6rem",
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              mb: 2,
            }}
          >
            404
          </Typography>

          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 500,
              mb: 2,
            }}
          >
            Page Not Found
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              mb: 4,
              maxWidth: "80%",
              mx: "auto",
            }}
          >
            The page you're looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </Typography>

          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              "&:hover": {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                transform: "translateY(-2px)",
                boxShadow: theme.shadows[4],
              },
              transition: "all 0.3s ease-in-out",
            }}
          >
            Back to Home
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}
