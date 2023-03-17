import axios from "axios";
import store from "../store";
import { userLogout } from "../store/authSlice";

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

// api interceptors

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch(userLogout());
    }
    return Promise.reject(err);
  }
);

export default api;
