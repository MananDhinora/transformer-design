import { Button, Container, Stack } from "@mui/material";
import PropTypes from "prop-types";
import NavBar from "../NavBar/navbar";
function DashBoard({ mode, toggleColorMode }) {
  return (
    <>
      <NavBar mode={mode} toggleColorMode={toggleColorMode} />
      <Container maxWidth="md" sx={{ mt: "15" }}>
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
// Props validation
DashBoard.propTypes = {
  mode: PropTypes.string.isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default DashBoard;
