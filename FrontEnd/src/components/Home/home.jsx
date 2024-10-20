import { Box, Container, Typography } from "@mui/material";
import PropTypes from "prop-types";
import NavBar from "../NavBar/navbar";

function Home({ mode, toggleColorMode }) {
  return (
    <>
      <NavBar mode={mode} toggleColorMode={toggleColorMode} />

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
// Props validation
Home.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default Home;
