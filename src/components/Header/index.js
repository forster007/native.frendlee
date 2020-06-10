import React from 'react';
import NavigationService from '../../services/navigation';
import {
  Container,
  CloseIcon,
  InfoIconButton,
  InfoIcon,
  Subtitle,
  Title,
  TitleBlock,
} from './styles';

export default function Header({
  background,
  titleAlign,
  left,
  right,
  rightFunction,
  rightProps,
  subtitle,
  title,
}) {
  const align = titleAlign || 'center';

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
            onPress={() => NavigationService.navigate('Payment')}
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

  function renderTitle() {
    if (title && subtitle) {
      return (
        <TitleBlock>
          <Title align={align}>{title}</Title>
          <Subtitle align={align}>{subtitle}</Subtitle>
        </TitleBlock>
      );
    }

    return <Title align={align}>{title}</Title>;
  }

  return (
    <Container background={background}>
      {renderLeft()}
      {renderTitle()}
      {renderRight()}
    </Container>
  );
}
