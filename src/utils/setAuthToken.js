import api from "./api";

// Central key for the persisted auth token.
// SECURITY NOTE: storing JWTs in localStorage exposes them to any XSS on the
// page. Prefer an httpOnly cookie set by the backend; until then keep CSP tight
// and sanitize all rendered user input. Tracked in issue #48.
export const STORAGE_KEY = "smart-metrics-logbook";

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem(STORAGE_KEY, token);
  } else {
    delete api.defaults.headers.common["x-auth-token"];
    localStorage.removeItem(STORAGE_KEY);
  }
};

export default setAuthToken;
