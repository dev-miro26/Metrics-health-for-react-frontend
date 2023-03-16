import { ADD_METRICS, GET_METRICS, METRICS_ERROR } from "../actions/types";

const initialState = {
  metrics: [],
  loading: true,
};

function metricsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_METRICS:
      return {
        ...state,
        metrics: [payload, ...state.metrics],
        loading: false,
      };
    case GET_METRICS:
      return {
        ...state,
        metrics: payload,
        loading: false,
      };
    case METRICS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export default metricsReducer;
