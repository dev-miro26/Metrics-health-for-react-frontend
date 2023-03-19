import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { createTheme } from "./theme";
import { CssBaseline } from "@mui/material";

//Redux
import { Provider } from "react-redux";
import store from "./store/index";
import MainRoutes from "./components/routing/MainRoutes";
import { ThemeProvider } from "@mui/material/styles";
import { apiLoadUser } from "./actions/auth";
import { setAuthToken } from "./utils";

//Style
import "./styles/custom/index.scss";
import "react-toastify/dist/ReactToastify.css";
import "simplebar-react/dist/simplebar.min.css";
import { userLogOut } from "./store/authSlice";

const App = () => {
  const theme = createTheme();

  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(apiLoadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch(userLogOut());
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Router>
          <MainRoutes></MainRoutes>
        </Router>
        <ToastContainer></ToastContainer>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
