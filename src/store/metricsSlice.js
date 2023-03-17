import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  metrics: [],
  loading: true,
};

export const metricsSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    addMetric: (state, action) => {
      state.isAuthenticate = true;
      state.loading = false;
      state.user = action.payload;
    },
    getMetrics: (state, action) => {
      state.metrics = action.payload;
      state.loading = false;
    },
    metricsError: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMetric, getMetrics, metricsError } = metricsSlice.actions;

export default metricsSlice.reducer;
