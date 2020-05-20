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

export function pushMessageRequest(message) {
  return {
    type: types.PUSH_MESSAGE_REQUEST,
    payload: { message },
  };
}
