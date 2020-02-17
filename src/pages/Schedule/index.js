import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components';

import { providersRequest } from '../../store/modules/providers/actions';

import { Container } from './styles';

export default function Schedule() {
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
      <Header title="Schedule" />
    </Container>
  );
}
