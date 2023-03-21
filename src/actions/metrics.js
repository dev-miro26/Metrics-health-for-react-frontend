import {
  addMetric,
  metricsError,
  getUserMetrics,
  deleteMetric,
  updateMetric,
  addMetricWage,
  deleteMetricWage,
  getMetricsAllWages,
  getMetricsTodayWages,
  updateMetricsWage,
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

export const apiAddMetricWage = (wage) => async (dispatch) => {
  try {
    const res = await api.post("metrics/wage", wage);

    toast.success(" Metrics Value is added!");
    return dispatch(addMetricWage(res.data.doc));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
      return dispatch(metricsError());
    }
  }
};

export const apiDeleteMetricWageById = (_id) => async (dispatch) => {
  try {
    await api.delete(`metrics/wage?_id=${_id}`);
    toast.success("The metric value has been successfully deleted.");
    return dispatch(deleteMetricWage({ _id: _id }));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
      // return dispatch(metricsError());
    }
  }
};

export const apiUpdateMetricWage = (formData) => async (dispatch) => {
  console.log(formData);
  try {
    const res = await api.put("metrics/wage", formData);

    toast.success(" Metrics is updated!");
    return dispatch(updateMetricsWage(res.data.doc));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
      return dispatch(metricsError());
    }
  }
};
export const apiGetMetricsAllWagesByUserId = () => async (dispatch) => {
  try {
    const res = await api.get("metrics/wage");

    return dispatch(getMetricsAllWages(res.data.docs));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
      return dispatch(metricsError());
    }
  }
};
export const apiGetMetricsTodayWagesByUserId = () => async (dispatch) => {
  try {
    const res = await api.get("metrics/wage/today");

    return dispatch(getMetricsTodayWages(res.data.docs));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
      return dispatch(metricsError());
    }
  }
};
