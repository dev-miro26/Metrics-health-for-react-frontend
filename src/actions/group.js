import {
  addGroup,
  deleteGroup,
  getGroups,
  groupError,
  updateGroup,
} from "../store/groupSlice";
import { api, toast } from "../utils";

export const apiGetGroupsByUserId = () => async (dispatch) => {
  try {
    const res = await api.get("group");

    return dispatch(getGroups(res.data.docs));
  } catch (err) {
    const errors = err?.response?.data?.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
      return dispatch(groupError());
    }
  }
};

export const apiAddGroup = (formData) => async (dispatch) => {
  try {
    const res = await api.post("group", formData);

    toast.success("New Group is added!");
    return dispatch(addGroup(res.data.doc));
  } catch (err) {
    console.log(err);
    const errors = err?.response.data?.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
      return dispatch(groupError());
    }
  }
};
export const apiUpdateGroup = (formData) => async (dispatch) => {
  console.log(formData);
  try {
    const res = await api.put("group", formData);

    toast.success(" Group is updated!");
    return dispatch(updateGroup(res.data.doc));
  } catch (err) {
    const errors = err?.response.data?.errors;
    if (errors) {
      errors.forEach((error) => error && toast.error(error.msg));
      return dispatch(groupError());
    }
  }
};

export const apiDeleteGroupById = (_id) => async (dispatch) => {
  try {
    await api.delete(`group?_id=${_id}`);
    toast.success("The Group has been successfully deleted.");
    return dispatch(deleteGroup({ _id: _id }));
  } catch (err) {
    const errors = err?.response.data?.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
      // return dispatch(metricsError());
    }
  }
};
