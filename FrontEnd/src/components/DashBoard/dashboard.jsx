import { Button, Container, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import useStore from "../../stores/Store";
export default function Dashboard() {
  const user = useStore((state) => state.user);

  useEffect(() => {
    console.log("Dashboard mounted, user:", user);
  }, [user]);

  return (
    <>
      {/* <NavBar /> */}
      <Container maxWidth="md" sx={{ mt: 15 }}>
        <Stack
          spacing={2}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Typography variant="h4">Welcome {user?.username}</Typography>
          <Button variant="contained" fullWidth>
            Create Design
          </Button>
          <Button variant="contained" fullWidth>
            Load Design
          </Button>
          <Button variant="contained" fullWidth color="secondary">
            Set Default Values
          </Button>
        </Stack>
      </Container>
    </>
  );
}
