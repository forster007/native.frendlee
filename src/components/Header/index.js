import React from 'react';
import { useDispatch } from 'react-redux';

import { signOutRequest } from '../../store/modules/auth/actions';
import { Container, InfoIconButton, InfoIcon, Title } from './styles';

export default function Header({ title }) {
  const dispatch = useDispatch();

  return (
    <Container>
      <InfoIconButton onPress={() => dispatch(signOutRequest())}>
        <InfoIcon name="cogs" />
      </InfoIconButton>
      <Title>{title}</Title>
      <InfoIconButton onPress={() => dispatch(signOutRequest())}>
        <InfoIcon name="bars" />
      </InfoIconButton>
    </Container>
  );
}
