import types from './types';

const INITIAL_STATE = {
  loading: false,
  providers: [],
};

export default function providers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.PROVIDERS_REQUEST:
      return { ...state, loading: true };

    case types.PROVIDERS_SUCCESS:
      return {
        loading: false,
        providers: action.payload.providers,
      };

    case types.PROVIDERS_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
}
