import { Alert } from 'react-native';
import {} from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '~/services/api';
import { connect, disconnect } from '~/services/websocket';
import { signIn } from '~/services/auth';
import NavigationService from '~/services/navigation';
import { signInSuccess, signInFailure } from './actions';
import { messagesRequest } from '../websocket/saga';
import types from './types';

export function* signInRequest({ payload }) {
  try {
    const { email, password } = payload;
    const responseCustomer = yield call(signIn, {
      account_type: 'customer',
      email,
      password,
    });

    const responseParent = yield call(signIn, {
      account_type: 'parent',
      email,
      password,
    });

    if (responseCustomer.status === 200) {
      console.log('customer');
      const { token, user } = responseCustomer.data;
      connect(user);

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      yield put(signInSuccess('customer', token, user));
      yield call(messagesRequest);

      NavigationService.navigate('AppTabs');
    } else if (responseParent.status === 200) {
      console.log('parent');
      const { token, user } = responseParent.data;
      connect(user);

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      yield put(signInSuccess('parent', token, user));
      yield call(messagesRequest);

      NavigationService.navigate('AppTabs');
    } else {
      console.log('otherwise');
      throw new Error('User or password doest not match');
    }
  } catch (error) {
    yield put(signInFailure());
    Alert.alert('OPS...', error.message);
  }
}

export function signOutRequest() {
  disconnect();
  NavigationService.navigate('SignIn');
}

export function setToken({ payload }) {
  if (!payload || (payload && !payload.auth)) return;

  const { token } = payload.auth;
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(types.PERSIST_REHYDRATE, setToken),
  takeLatest(types.SIGN_IN_REQUEST, signInRequest),
  takeLatest(types.SIGN_OUT_REQUEST, signOutRequest),
]);
