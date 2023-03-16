import { api, toast } from "../utils";
import { ADD_METRICS, GET_METRICS, METRICS_ERROR } from "./types";

export const addMetrics = (formData) => async (dispatch) => {
  console.log("@@@", formData);
  try {
    const res = await api.put("metrics/addMetrics", formData);
    dispatch({
      type: ADD_METRICS,
      payload: res.data,
    });
    toast.success("New metrics is added!");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
      dispatch({ type: METRICS_ERROR });
    }
  }
};

export const getMetrics = () => async (dispatch) => {
  try {
    const res = await api.get("metrics/getMetrics");
    console.log("%%", res);
    dispatch({
      type: GET_METRICS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
      dispatch({ type: METRICS_ERROR });
    }
  }
};
