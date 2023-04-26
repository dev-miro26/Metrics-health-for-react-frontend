import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [{ name: "", userId: "", contents: [] }],
  loading: true,
};

export const groupSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    addGroup: (state, action) => {
      state.loading = false;
      console.log("action.payload(add) = ", state.groups, action.payload);
      state.groups = [...state.groups, action.payload];
      console.log("action.payload(add) = ", state.groups, action.payload);
    },
    getGroups: (state, action) => {
      console.log("action.payload(get) = ", action.payload);
      if (action.payload) {
        state.groups = action.payload;
      } else {
        state.groups = [];
      }
    },
    deleteGroup: (state, action) => {
      state.groups = state.groups.filter(
        (group) => group._id !== action.payload._id
      );
      state.loading = false;
    },
    updateGroup: (state, action) => {
      state.loading = false;
      state.groups =
        state.groups &&
        state.groups.map((group) =>
          group._id === action.payload._id ? action.payload : group
        );
    },
    groupError: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addGroup, getGroups, deleteGroup, updateGroup, groupError } =
  groupSlice.actions;

export default groupSlice.reducer;
