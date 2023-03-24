import api from "./api";

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem("metronic-log-books", token);
  } else {
    delete api.defaults.headers["x-auth-token"];
    localStorage.removeItem("metronic-log-books");
  }
};

export default setAuthToken;
