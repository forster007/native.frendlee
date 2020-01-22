import { Alert } from 'react-native';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';
import { signIn } from '~/services/auth';
import NavigationService from '~/services/navigation';

import { signInSuccess, signInFailure } from './actions';
import types from './types';

export function* signInRequest({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(signIn, { email, password });
    const { token } = response.data;

    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token));
    NavigationService.navigate('AppTabs');
  } catch (error) {
    yield put(signInFailure());

    Alert.alert('Usuário ou senha inválidos. Verifique e tente novamente');
  }
}

export function signOutRequest() {
  NavigationService.navigate('SignIn');
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(types.PERSIST_REHYDRATE, setToken),
  takeLatest(types.SIGN_IN_REQUEST, signInRequest),
  takeLatest(types.SIGN_OUT_REQUEST, signOutRequest),
]);
