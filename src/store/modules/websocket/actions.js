import types from './types';

export function messagesRequest() {
  return {
    type: types.MESSAGES_REQUEST,
  };
}

export function messagesSuccess(messages) {
  return {
    type: types.MESSAGES_SUCCESS,
    payload: { messages },
  };
}
