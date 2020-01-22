import types from './types';

export function providersRequest() {
  return {
    type: types.PROVIDERS_REQUEST,
  };
}

export function providersSuccess(providers) {
  return {
    type: types.PROVIDERS_SUCCESS,
    payload: { providers },
  };
}

export function providersFailure() {
  return {
    type: types.PROVIDERS_FAILURE,
  };
}
