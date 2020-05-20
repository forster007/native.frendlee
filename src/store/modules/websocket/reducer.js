import types from './types';

const INITIAL_STATE = {
  messages: [],
  message: {},
};

export default function messages(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.MESSAGES_REQUEST:
      return {};

    case types.MESSAGES_SUCCESS:
      return {
        messages: action.payload.messages,
      };

    case types.PUSH_MESSAGE_REQUEST:
      return {
        messages: state.messages,
        message: action.payload.message,
      };

    default:
      return state;
  }
}
