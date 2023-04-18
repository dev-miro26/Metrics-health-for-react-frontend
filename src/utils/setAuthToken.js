import api from "./api";

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem("smart-metrics-logbook", token);
  } else {
    delete api.defaults.headers["x-auth-token"];
    localStorage.removeItem("smart-metrics-logbook");
  }
};

export default setAuthToken;
