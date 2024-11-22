import { Box, Container, Typography } from "@mui/material";
// import useStore from "../../stores/Store";
// import NavBar from "../NavBar/navbar";
function Home() {
  // const themeState = useStore((state) => ({
  //   mode: state.mode,
  //   toggleColorMode: state.toggleColorMode,
  // }));

  return (
    <>
      {/* <NavBar {...themeState} /> */}

      <Box component="main" sx={{ mt: 8, textAlign: "center", pt: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to the Home Page
          </Typography>
        </Container>
      </Box>
    </>
  );
}

export default Home;
