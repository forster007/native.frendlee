import React from 'react';
import { useDispatch } from 'react-redux';
import NavigationService from '../../services/navigation';
import { signOutRequest } from '../../store/modules/auth/actions';
import { Container, InfoIconButton, InfoIcon, Title } from './styles';

export default function Header({ left, right, title }) {
  const dispatch = useDispatch();

  function renderLeft() {
    switch (left) {
      case 'goBack': {
        return (
          <InfoIconButton
            align="flex-start"
            onPress={() => NavigationService.goBack()}
          >
            <InfoIcon name="angle-left" />
          </InfoIconButton>
        );
      }

      default: {
        return (
          <InfoIconButton align="flex-start">
            <InfoIcon name="cogs" />
          </InfoIconButton>
        );
      }
    }
  }

  function renderRight() {
    switch (right) {
      case 'menu': {
        return (
          <InfoIconButton
            align="flex-end"
            onPress={() => dispatch(signOutRequest())}
          >
            <InfoIcon name="bars" />
          </InfoIconButton>
        );
      }
      default: {
        return <InfoIconButton />;
      }
    }
  }

  return (
    <Container>
      {renderLeft()}
      <Title>{title}</Title>
      {renderRight()}
    </Container>
  );
}
