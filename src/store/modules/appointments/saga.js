import { Alert } from 'react-native';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getAppointments } from '~/services/appointments';
import { appointmentsSuccess, appointmentsFailure } from './actions';
import types from './types';

export function* appointmentsRequest() {
  try {
    const { data, config } = yield call(getAppointments);
    console.log(config.headers.Authorization);

    yield put(appointmentsSuccess(data));
  } catch (error) {
    yield put(appointmentsFailure());

    Alert.alert('Não foi possível buscar os Apontamentos');
  }
}

export default all([
  takeLatest(types.APPOINTMENTS_REQUEST, appointmentsRequest),
]);
