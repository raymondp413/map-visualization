import * as actions from "../actions";

const initialState = {
  loading: false,
  data: [],
  lastDronePosition: {
    timestamp: null,
    metric: null,
    latitude: null,
    longitude: null
  }
};

const startLoading = (state, action) => {
  return { ...state, loading: true };
};

const droneDataRecevied = (state, action) => {
  const { data } = action;

  const lastDronePosition = data.data.slice(-1)[0];

  return {
    ...state,
    loading: false,
    //data: data.data,
    lastDronePosition
  };
};

const droneGeoDataReceived = (state, action) => {
  const { data } = action;

  return {
    ...state,
    address: data.results[0].formatted_address
  }
}

const handlers = {
  [actions.FETCH_DRONE]: startLoading,
  [actions.DRONE_DATA_RECEIVED]: droneDataRecevied,
  [actions.DRONE_GEODATA_RECEIVED]: droneGeoDataReceived
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
