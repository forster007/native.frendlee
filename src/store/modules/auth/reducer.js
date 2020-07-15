import types from './types';

const INITIAL_STATE = {
  account_type: '',
  loading: false,
  signed: false,
  token: '',
  user: {},
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SIGN_IN_REQUEST:
      return { ...state, loading: true };

    case types.SIGN_IN_SUCCESS:
      return {
        account_type: action.payload.account_type,
        loading: false,
        signed: true,
        token: action.payload.token,
        user: action.payload.user,
      };

    case types.SIGN_IN_FAILURE:
      return { ...state, loading: false };

    case types.SIGN_OUT_REQUEST:
      return INITIAL_STATE;

    default:
      return state;
  }
}
