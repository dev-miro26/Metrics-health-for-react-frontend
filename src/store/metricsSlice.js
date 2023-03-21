import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  metrics: [],
  loading: true,
  metricsValues: [],
};

export const metricsSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    addMetric: (state, action) => {
      state.loading = false;
      state.metrics = [...state.metrics, action.payload];
    },
    updateMetric: (state, action) => {
      state.loading = false;
      state.metrics = state.metrics.map((metric) =>
        metric._id === action.payload._id ? action.payload : metric
      );
    },
    getUserMetrics: (state, action) => {
      state.metrics = action.payload;
      state.loading = false;
    },
    deleteMetric: (state, action) => {
      state.metrics = state.metrics.filter(
        (metric) => metric._id !== action.payload._id
      );
      state.loading = false;
    },
    addMetricValue: (state, action) => {
      state.metricsValues = [...state.metricsValues, action.payload];
    },
    getMetricsValues: (state, action) => {
      state.metricsValues = action.payload;
    },
    deleteMetricValue: (state, action) => {
      state.metricsValues = state.metricsValues.filter(
        (value) => value._id !== action.payload._id
      );
      state.loading = false;
    },
    updateMetricsValue: (state, action) => {
      state.loading = false;
      state.metricsValues = state.metricsValues.map((metric) =>
        metric._id === action.payload._id ? action.payload : metric
      );
    },
    metricsError: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addMetric,
  getUserMetrics,
  metricsError,
  deleteMetric,
  updateMetric,
  addMetricValue,
  deleteMetricValue,
  updateMetricsValue,
  getMetricsValues,
} = metricsSlice.actions;

export default metricsSlice.reducer;
