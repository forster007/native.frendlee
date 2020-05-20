import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getMessages } from '~/services/messages';
import { connect, socket } from '~/services/websocket';
import { messagesSuccess } from './actions';
import types from './types';

export function* messagesRequest() {
  try {
    const { data } = yield call(getMessages);
    yield put(messagesSuccess(data));
  } catch (error) {
    console.log('--> messagesRequest: ', error);
  }
}

export function* setWebSocket({ payload }) {
  if (!payload || (payload && payload.auth.user === '')) return;

  const { user } = payload.auth;
  connect(user);

  yield call(messagesRequest);
}

export default all([
  takeLatest(types.PERSIST_REHYDRATE, setWebSocket),
  takeLatest(types.MESSAGES_REQUEST, messagesRequest),
]);
