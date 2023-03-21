import {
  addMetric,
  metricsError,
  getUserMetrics,
  deleteMetric,
  updateMetric,
  addMetricValue,
  deleteMetricValue,
  getMetricsValues,
  updateMetricsValue,
} from "../store/metricsSlice";
import { api, toast } from "../utils";

export const apiAddMetric = (formData) => async (dispatch) => {
  console.log("@@@", formData);

  try {
    const res = await api.post("metrics", formData);

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
export const apiUpdateMetric = (formData) => async (dispatch) => {
  console.log(formData);
  try {
    const res = await api.put("metrics", formData);

    toast.success(" Metrics is updated!");
    return dispatch(updateMetric(res.data.doc));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
      return dispatch(metricsError());
    }
  }
};
export const apiGetMetricsByUserId = () => async (dispatch) => {
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

export const apiDeleteMetricById = (_id) => async (dispatch) => {
  try {
    await api.delete(`metrics?_id=${_id}`);
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

export const apiAddMetricValue = (metricValue) => async (dispatch) => {
  try {
    const res = await api.post("metrics/value", metricValue);

    toast.success(" Metrics Value is added!");
    return dispatch(addMetricValue(res.data.doc));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
      return dispatch(metricsError());
    }
  }
};

export const apiDeleteMetricValueById = (_id) => async (dispatch) => {
  try {
    await api.delete(`metrics/value?_id=${_id}`);
    toast.success("The metric value has been successfully deleted.");
    return dispatch(deleteMetricValue({ _id: _id }));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
      // return dispatch(metricsError());
    }
  }
};

export const apiUpdateMetricValue = (formData) => async (dispatch) => {
  console.log(formData);
  try {
    const res = await api.put("metrics/value", formData);

    toast.success(" Metrics is updated!");
    return dispatch(updateMetricsValue(res.data.doc));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
      return dispatch(metricsError());
    }
  }
};
export const apiGetMetricsValuesByUserId = () => async (dispatch) => {
  try {
    const res = await api.get("metrics/value");

    return dispatch(getMetricsValues(res.data.docs));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
      return dispatch(metricsError());
    }
  }
};
