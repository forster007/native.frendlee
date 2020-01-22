import { Alert } from 'react-native';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getProviders } from '~/services/providers';

import { providersSuccess, providersFailure } from './actions';
import types from './types';

export function* providersRequest() {
  try {
    const response = yield call(getProviders);
    const providers = response.data;

    yield put(providersSuccess(providers));
  } catch (error) {
    yield put(providersFailure());

    Alert.alert('Não foi possível buscar os Providers');
  }
}

export default all([takeLatest(types.PROVIDERS_REQUEST, providersRequest)]);
