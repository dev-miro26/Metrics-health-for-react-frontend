import { addMetric, metricsError } from "../store/metricsSlice";
import { api, toast } from "../utils";

export const addMetrics = (formData) => async (dispatch) => {
  console.log("@@@", formData);
  try {
    const res = await api.put("metrics/addMetrics", formData);

    dispatch(addMetric(res.data.doc));
    toast.success("New metrics is added!");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
      dispatch(metricsError());
    }
  }
};

export const getMetrics = () => async (dispatch) => {
  try {
    const res = await api.get("metrics/getMetrics");
    console.log("%%", res);

    dispatch(getMetrics(res.data.docs));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
      dispatch(metricsError());
    }
  }
};
