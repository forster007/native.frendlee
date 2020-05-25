import React from 'react';
import { useDispatch } from 'react-redux';
import NavigationService from '../../services/navigation';
import { signOutRequest } from '../../store/modules/auth/actions';
import {
  Container,
  CloseIcon,
  InfoIconButton,
  InfoIcon,
  Title,
} from './styles';

export default function Header({
  background,
  titleAlign,
  left,
  right,
  rightFunction,
  rightProps,
  title,
}) {
  const align = titleAlign || 'center';
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

      case 'profile': {
        return (
          <InfoIconButton
            align="flex-start"
            onPress={() => dispatch(signOutRequest())}
          >
            <InfoIcon name="cogs" />
          </InfoIconButton>
        );
      }

      default: {
        return null;
      }
    }
  }

  function renderRight() {
    switch (right) {
      case 'close': {
        return (
          <InfoIconButton
            align="flex-end"
            onPress={() => rightFunction(!rightProps)}
          >
            <CloseIcon name="closecircleo" />
          </InfoIconButton>
        );
      }

      case 'menu': {
        return (
          <InfoIconButton
            align="flex-end"
            onPress={() => rightFunction(!rightProps)}
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
    <Container background={background}>
      {renderLeft()}
      <Title align={align}>{title}</Title>
      {renderRight()}
    </Container>
  );
}
