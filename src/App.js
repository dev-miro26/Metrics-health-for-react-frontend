import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { createTheme } from "./theme";
import { CssBaseline } from "@mui/material";

import MainRoutes from "./components/routing/MainRoutes";
import { ThemeProvider } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";
import "simplebar-react/dist/simplebar.min.css";

import "./styles/index.scss";

const App = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MainRoutes></MainRoutes>
      </Router>
      <ToastContainer></ToastContainer>
    </ThemeProvider>
  );
};

export default App;
