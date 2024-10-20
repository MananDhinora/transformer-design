import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/home";
import NavBar from "./components/NavBar/navbar";

function App({ mode, toggleColorMode }) {
  return (
    <>
      <NavBar mode={mode} toggleColorMode={toggleColorMode} />
      <Routes>
        <Route
          path="/"
          element={<Home mode={mode} toggleColorMode={toggleColorMode} />}
        />
        {/* Add other routes here */}
      </Routes>
    </>
  );
}

App.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default App;
