import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: {},
};

export const authReducer = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    userLogined: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    userRegister: (state) => {
      state.isAuthenticated = true;
      state.loading = false;
    },
    userLoginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.token = action.payload;
    },
    userLogOut: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    userAuthError: (state, action) => {
      state.token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  userLogined,
  userLoginSuccess,
  userLogOut,
  userRegister,
  userAuthError,
} = authReducer.actions;

export default authReducer.reducer;
