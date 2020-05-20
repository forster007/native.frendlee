import { eventChannel } from 'redux-saga';
import { all, call, put, select, take, takeLatest } from 'redux-saga/effects';
import { getMessages, sendMesssage } from '~/services/messages';
import { connect, socket } from '~/services/websocket';
import { messagesSuccess } from './actions';
import types from './types';

export function* messagesRequest() {
  try {
    const { data } = yield call(getMessages);
    yield put(messagesSuccess(data.messages));
  } catch (error) {
    console.log('--> messagesRequest: ', error);
  }
}

export function* AsyncFirebaseMessagesRequest() {
  const channel = eventChannel(emitter => {
    socket.on('message', e => emitter(e));

    return () => socket.close();
  });

  while (true) {
    const snapshot = yield take(channel);
    yield call(messagesRequest);
  }
}

export function* pushMessagesRequest({ payload }) {
  const { message } = payload;

  yield call(sendMesssage, message);
  yield call(messagesRequest);
}

export function* setWebSocket({ payload }) {
  if (!payload || (payload && payload.auth.user === '')) return;

  const { user } = payload.auth;
  connect(user);

  yield call(messagesRequest);
  yield call(AsyncFirebaseMessagesRequest);
}

export default all([
  takeLatest(types.PERSIST_REHYDRATE, setWebSocket),
  takeLatest(types.MESSAGES_REQUEST, messagesRequest),
  takeLatest(types.PUSH_MESSAGE_REQUEST, pushMessagesRequest),
]);
