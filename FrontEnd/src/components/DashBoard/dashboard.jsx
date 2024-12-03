import {
  Create as CreateIcon,
  Settings as DefaultIcon,
  FolderOpen as LoadIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../stores/Store";

export default function Dashboard() {
  const theme = useTheme();
  const user = useStore((state) => state.user);
  const setMode = useStore((state) => state.setMode);
  const navigate = useNavigate();
  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 10,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Card
        elevation={6}
        sx={{
          borderRadius: 4,
          p: 4,
          backgroundColor: theme.palette.background.paper,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(145deg, #222 0%, #111 100%)"
              : "linear-gradient(145deg, #f0f4f8 0%, #e6eaf0 100%)",
        }}
      >
        <CardContent>
          <Stack spacing={3} alignItems="center">
            {/* Avatar and Welcome Section */}
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                mb: 2,
              }}
            >
              {user?.username?.[0]?.toUpperCase() || "U"}
            </Avatar>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                textAlign: "center",
                color: theme.palette.text.primary,
              }}
            >
              Welcome, {user?.username || "User"}
            </Typography>
            {/* Action Buttons */}
            <Grid container spacing={2} sx={{ width: "100%" }}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<CreateIcon />}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    "&:hover": {
                      background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[4],
                    },
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  Create Design
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<LoadIcon />}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    "&:hover": {
                      background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[4],
                    },
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  Load Design
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<DefaultIcon />}
                  onClick={() => navigate("/set-default-values")}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    "&:hover": {
                      background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[4],
                    },
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  Set Default Value
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
