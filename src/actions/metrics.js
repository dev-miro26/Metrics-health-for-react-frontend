import {
  addMetric,
  metricsError,
  getUserMetrics,
  deleteMetric,
} from "../store/metricsSlice";
import { api, toast } from "../utils";

export const addMetrics = (formData) => async (dispatch) => {
  console.log("@@@", formData);

  try {
    const res = await api.put("metrics", formData);

    toast.success("New metrics is added!");
    return dispatch(addMetric(res.data.doc));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
      return dispatch(metricsError());
    }
  }
};

export const getUserMetricsById = () => async (dispatch) => {
  try {
    const res = await api.get("metrics");

    return dispatch(getUserMetrics(res.data.docs));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
      return dispatch(metricsError());
    }
  }
};

export const deleteMetricById = (_id) => async (dispatch) => {
  try {
    const res = await api.delete(`metrics?_id=${_id}`);
    toast.success("The metric has been successfully deleted.");
    return dispatch(deleteMetric({ _id: _id }));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
      // return dispatch(metricsError());
    }
  }
};
