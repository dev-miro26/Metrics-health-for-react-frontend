import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  metrics: [],
  loading: true,
  wages: [],
  todayWages: [],
  lastestWages: [],
};

export const metricsSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    addMetric: (state, action) => {
      state.loading = false;

      state.metrics = action.payload
        ? [...state.metrics, action.payload]
        : state.metrics;
    },
    updateMetric: (state, action) => {
      state.loading = false;
      state.metrics = state.metrics?.map((metric) =>
        metric._id === action.payload._id ? action.payload : metric
      );
    },
    getUserMetrics: (state, action) => {
      state.metrics = action.payload ? action.payload : [];
      state.loading = false;
    },
    deleteMetric: (state, action) => {
      state.metrics = state.metrics?.filter(
        (metric) => metric._id !== action.payload._id
      );
      
      state.loading = false;
    },
    addMetricWage: (state, action) => {
      state.wages = [...state.wages, action.payload];
      state.todayWages = [...state.todayWages, action.payload];
      // state.lastestWages = [...state.lastestWages, action.payload];
      // state.lastestWages[0].delete();
      // state.lastest.shift(action.payload);
    },
    getMetricsAllWages: (state, action) => {
      state.wages = action.payload ? action.payload : [];
    },
    getMetricsTodayWages: (state, action) => {
      state.todayWages = action.payload ? action.payload : [];
    },
    getMetricsLastestWages: (state, action) => {
      state.lastestWages = action.payload ? action.payload : [];
    },
    deleteMetricWage: (state, action) => {
      state.wages = state.wages?.filter(
        (value) => value._id !== action.payload._id
      );
      state.todayWages = state.todayWages?.filter(
        (value) => value._id !== action.payload._id
      );
      state.lastestWages = state.lastestWages?.filter(
        (value) => value._id !== action.payload._id
      );
      state.loading = false;
    },
    updateMetricsWage: (state, action) => {
      state.loading = false;
      state.wages = state.wages?.map((metric) =>
        metric._id === action.payload._id ? action.payload : metric
      );
      state.todayWages = state.todayWages?.map((wage) =>
        wage._id === action.payload._id ? action.payload : wage
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
  addMetricWage,
  deleteMetricWage,
  updateMetricsWage,
  getMetricsAllWages,
  getMetricsTodayWages,
  getMetricsLastestWages,
} = metricsSlice.actions;

export default metricsSlice.reducer;
