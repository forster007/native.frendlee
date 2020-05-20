import types from './types';

const INITIAL_STATE = {
  messages: [],
};

export default function messages(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.MESSAGES_REQUEST:
      return {};

    case types.MESSAGES_SUCCESS:
      return {
        messages: action.payload.messages,
      };

    default:
      return state;
  }
}
