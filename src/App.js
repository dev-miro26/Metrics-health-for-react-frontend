import React, { useEffect } from "react";
import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { createTheme } from "./theme";
import { CssBaseline } from "@mui/material";

import store from "./store/index";
import MainRoutes from "./components/routing/MainRoutes";
import { ThemeProvider } from "@mui/material/styles";
import { apiLoadUser } from "./actions/auth";
import { setAuthToken } from "./utils";
import "react-toastify/dist/ReactToastify.css";
import "simplebar-react/dist/simplebar.min.css";
import { userLogOut } from "./store/authSlice";
import CirclesLoader from "./components/loader/CirclesLoader";

import "./styles/index.scss";

const App = () => {
  const theme = createTheme();
  useEffect(() => {
    if (localStorage.getItem("smart-metrics-logbook")) {
      setAuthToken(localStorage.getItem("smart-metrics-logbook"));
      store.dispatch(apiLoadUser());
    } else {
      store.dispatch(userLogOut());
    }
    window.addEventListener("storage", () => {});
  }, []);

  return (
    // <Suspense fallback={<CirclesLoader />}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MainRoutes></MainRoutes>
      </Router>
      <ToastContainer></ToastContainer>
    </ThemeProvider>
    // </Suspense>
  );
};

export default App;
