import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RectButton } from 'react-native-gesture-handler';

import { providersRequest } from '../../store/modules/providers/actions';
import { signOutRequest } from '../../store/modules/auth/actions';

import { Container } from './styles';

export default function Home() {
  const dispatch = useDispatch();
  const { loading, providers } = useSelector(state => state.providers);

  function handleProviders() {
    dispatch(providersRequest());
  }

  useEffect(() => {
    handleProviders();
  }, []);

  return (
    <Container>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <RectButton onPress={() => dispatch(signOutRequest())}>
          <Text>Switch</Text>
        </RectButton>
      )}
    </Container>
  );
}
