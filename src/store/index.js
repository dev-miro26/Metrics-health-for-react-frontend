import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import metricsSlice from "./metricsSlice";
import { setAuthToken } from "../utils";
const store = configureStore({
  reducer: { auth: authSlice, metrics: metricsSlice },
});

export default store;

let currentState = store.getState();

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();
  // if the token changes set the value in localStorage and axios headers
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});
