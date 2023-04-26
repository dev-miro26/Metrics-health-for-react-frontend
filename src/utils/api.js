import axios from "axios";
import store from "../store";
import { userLogOut } from "../store/authSlice";

// const isDev = process.env.NODE_ENV === "development";
export const MODEL_API_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8000/api/"
    : "https://smart-metrics-logbook.herokuapp.com/api/";

// Create an instance of axios
const api = axios.create({
  baseURL: MODEL_API_URL,
  headers: {
    Accept: "application/json",
  },
});
/*
  NOTE: intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
*/

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch(userLogOut());
    }
    return Promise.reject(err);
  }
);

export default api;
