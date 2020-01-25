import React from 'react';
import {
  BlockBody,
  BlockFooter,
  BlockHeader,
  BodyText,
  BodyTitle,
  ButtonNext,
  ButtonNextText,
  Container,
  Content,
  Div,
  Divisor,
  FooterStep,
  HeaderLogo,
  HeaderSubTitle,
  StepNumber,
  StepText,
} from './styles';

export default function SignUpStep4({ navigation }) {
  return (
    <Container>
      <Content>
        <BlockHeader>
          <HeaderLogo />
          <HeaderSubTitle>
            Ready! We just sent a confirmation message to the email that you
            registered.
            {'\n\n'}
            In the meantime, how about customizing the app your way?
          </HeaderSubTitle>
        </BlockHeader>

        <BlockBody>
          <Divisor />

          <BodyTitle>Preferências e ajustes</BodyTitle>
          <BodyText color="#7244d4">Preferências e ajustes</BodyText>

          <Divisor />

          <BodyTitle>Dados de pagamento</BodyTitle>
          <BodyText color="#7244d4">
            Insira agora os seus dados de pagamento e ganhe tempo.
          </BodyText>
          <BodyText color="#302d46">
            Seus dados estão sem segurança, pode confiar. Se preferir, faça isso
            posteriormente ou efetue seus pagamentos em dinheiro, sem
            complicação.
          </BodyText>

          <Divisor />

          <BodyTitle>Aprenda a usar</BodyTitle>
          <BodyText color="#7244d4">
            Clique aqui e veja rapidamento como usar o seu aplicativo.
          </BodyText>
          <BodyText color="#7244d4">
            Se preferir, leia aqui as perguntas mais frequentes que nossos
            usuários fazem.
          </BodyText>

          <Divisor />

          <Div>
            <ButtonNext state>
              <ButtonNextText>LEVE-ME AO APLICATIVO</ButtonNextText>
            </ButtonNext>
          </Div>
        </BlockBody>

        <BlockFooter>
          <FooterStep selected>
            <StepNumber>1</StepNumber>
          </FooterStep>
          <FooterStep selected>
            <StepNumber>2</StepNumber>
          </FooterStep>
          <FooterStep selected>
            <StepNumber>3</StepNumber>
          </FooterStep>
          <FooterStep selected>
            <StepNumber selected>4</StepNumber>
            <StepText>Finish</StepText>
          </FooterStep>
        </BlockFooter>
      </Content>
    </Container>
  );
}
