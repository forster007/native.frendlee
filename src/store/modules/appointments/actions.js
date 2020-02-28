import types from './types';

export function appointmentsRequest() {
  return {
    type: types.APPOINTMENTS_REQUEST,
  };
}

export function appointmentsSuccess(appointments) {
  return {
    type: types.APPOINTMENTS_SUCCESS,
    payload: { appointments },
  };
}

export function appointmentsFailure() {
  return {
    type: types.APPOINTMENTS_FAILURE,
  };
}
