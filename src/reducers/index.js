import { combineReducers } from "redux";
import auth from "./auth";
import metrics from "./metrics";

export default combineReducers({
  auth,
  metrics,
});
