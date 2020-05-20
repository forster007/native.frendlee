import { all } from 'redux-saga/effects';
import auth from './auth/saga';
import websocket from './websocket/saga';

export default function* rootSaga() {
  return yield all([auth, websocket]);
}
