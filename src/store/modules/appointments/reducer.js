import types from './types';

const INITIAL_STATE = {
  loading: false,
  appointments: [],
};

export default function appointments(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.APPOINTMENTS_REQUEST:
      return { ...state, loading: true };

    case types.APPOINTMENTS_SUCCESS:
      return {
        loading: false,
        appointments: action.payload.appointments,
      };

    case types.APPOINTMENTS_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
}
