import types from './types';

const INITIAL_STATE = {
  loading: false,
  signed: null,
  token: null,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SIGN_IN_REQUEST:
      return { ...state, loading: true };

    case types.SIGN_IN_SUCCESS:
      return {
        loading: false,
        signed: true,
        token: action.payload.token,
      };

    case types.SIGN_IN_FAILURE:
      return { ...state, loading: false };

    case types.SIGN_OUT_REQUEST:
      return INITIAL_STATE;

    default:
      return state;
  }
}
