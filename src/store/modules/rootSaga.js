import { all } from 'redux-saga/effects';

import auth from './auth/saga';
import providers from './providers/saga';

export default function* rootSaga() {
  return yield all([auth, providers]);
}
