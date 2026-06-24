import api from "./api";

// Central key for the persisted auth token.
// SECURITY NOTE: storing JWTs in localStorage exposes them to any XSS on the
// page. Prefer an httpOnly cookie set by the backend; until then keep CSP tight
// and sanitize all rendered user input. Tracked in issue #48.
export const STORAGE_KEY = "smart-metrics-logbook";

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;
  } else {
    // Clear from the same `.common` path the header was set on.
    delete api.defaults.headers.common["x-auth-token"];
  }
  // Guard storage access: localStorage can throw in private mode or non-browser
  // environments; the in-memory header is the source of truth.
  try {
    if (token) localStorage.setItem(STORAGE_KEY, token);
    else localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    /* ignore storage failures */
  }
};

export default setAuthToken;
