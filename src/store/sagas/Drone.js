import { takeEvery, call, put, cancel, all } from "redux-saga/effects";
import API from "../api";
import * as actions from "../actions";

function* watchDroneDataReceived(action) {
  const lastDronePosition = action.data.data.slice(-1)[0];
  const { error, data } = yield call(
    API.findDroneGeo,
    lastDronePosition.latitude,
    lastDronePosition.longitude
  );
  if (error) {
    yield put({ type: actions.API_ERROR, code: error.code });
    yield cancel();
    return;
  }
  yield put({ type: actions.DRONE_GEODATA_RECEIVED, data });
}

function* watchFetchDrone(action) {
  const { error, data } = yield call(
    API.findDrone
  );

  if (error) {
    console.log({ error });
    yield put({ type: actions.API_ERROR, code: error.code });
    yield cancel();
    return;
  }

  if (!data) {
    yield put({ type: actions.API_ERROR });
    yield cancel();
    return;
  }

  yield put({ type: actions.DRONE_DATA_RECEIVED, data });
}

function* watchAppLoad() {
  yield all([
    takeEvery(actions.FETCH_DRONE, watchFetchDrone),
    takeEvery(actions.DRONE_DATA_RECEIVED, watchDroneDataReceived)
  ]);
}

export default [watchAppLoad];
