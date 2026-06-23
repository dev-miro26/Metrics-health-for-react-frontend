import {
  userAuthError,
  userLogined,
  userLoginSuccess,
  userLogOut,
  userRegister,
} from "../store/authSlice";
import { api, setAuthToken, toast } from "../utils";
// Load User
export const apiLoadUser = (navigate) => async (dispatch) => {
  try {
    const res = await api.get("auth/loadUser");

    await dispatch(userLogined(res.data.doc));
  } catch (err) {
    // Only force a logout/redirect on a genuine auth failure (401);
    // transient/network errors should preserve the session.
    if (err?.response?.status === 401) {
      await dispatch(userAuthError());
      navigate("/auth/login");
    }
  }
};

// Register User
export const apiRegister = (formData) => async (dispatch) => {
  try {
    const res = await api.post("auth/register", formData);

    dispatch(userRegister(res.data.doc));
    setAuthToken(res.data.doc);
    toast.success("You are successfully registered!");
    dispatch(apiLoadUser());
  } catch (err) {
    const errors = err?.response?.data?.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }

  }
};

// Login User
export const apiLogin = (formData) => async (dispatch) => {
  try {
    const res = await api.post("auth/login", formData);

    dispatch(userLoginSuccess(res.data.doc));

    dispatch(apiLoadUser());
  } catch (err) {
    const errors = err?.response?.data?.errors;

    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }
};

// Logout
export const apiLogout = () => (dispatch) => {
  setAuthToken(null);
  dispatch(userLogOut());
};
