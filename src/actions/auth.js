import {
  userAuthError,
  userLogined,
  userLoginSuccess,
  userLogOut,
  userRegister,
} from "../store/authSlice";
import { api, toast } from "../utils";

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("auth/loadUser");
    console.log(res);

    dispatch(userLogined(res.data.doc));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => console.log(error.msg));
    }
    dispatch(userAuthError());
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post("auth/register", formData);

    dispatch(userRegister(res.data.doc));
    toast.success("You are successfully registered!");
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }

    // dispatch(userAuthError());
  }
};

// Login User
export const login = (formData) => async (dispatch) => {
  try {
    const res = await api.post("auth/login", formData);

    dispatch(userLoginSuccess(res.data.doc));

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }
};

// Logout
export const logout = () => userLogOut();
