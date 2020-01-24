import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
  BlockBody,
  BlockFooter,
  BlockHeader,
  BodyRow,
  BodyTitle,
  Button,
  ButtonContainer,
  ButtonText,
  ButtonGroup,
  ButtonGroupOption,
  ButtonGroupText,
  ButtonNext,
  ButtonNextText,
  Container,
  Content,
  Divisor,
  FooterStep,
  FormContainer,
  FrendleeLogo,
  HeaderSubTitle,
  InputTitle,
  StepNumber,
  StepText,
} from './styles';

export default function SignUpStep4({ navigation }) {
  return (
    <Container>
      <ScrollView>
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <BlockHeader>
              <FrendleeLogo />
              <HeaderSubTitle>
                Pronto! Acabamos de enviar uma mensagem de confirmação para o
                e-mail que você cadastrou.
                {'\n\n'}
                Enquanto isso, que tal personalizar o aplicativo do seu jeito?
              </HeaderSubTitle>
            </BlockHeader>

            <BlockBody style={{ backgroundColor: '#e0e0e0', paddingTop: 20 }}>
              <Text
                style={{ color: '#2A3152', fontSize: 24, fontWeight: 'bold' }}
              >
                Preferências e ajustes
              </Text>
              <Text style={{ color: '#7244d4', fontSize: 18 }}>
                Preferências e ajustes
              </Text>
              <BodyRow>
                <Divisor />
              </BodyRow>
              <Text
                style={{ color: '#2A3152', fontSize: 24, fontWeight: 'bold' }}
              >
                Dados de pagamento
              </Text>
              <Text style={{ color: '#7244d4', fontSize: 18 }}>
                Insira agora os seus dados de pagamento e ganhe tempo.
              </Text>
              <Text style={{ color: '#302d46', fontSize: 18 }}>
                Seus dados estão sem segurança, pode confiar. Se preferir, faça
                isso posteriormente ou efetue seus pagamentos em dinheiro, sem
                complicação.
              </Text>
              <BodyRow>
                <Divisor />
              </BodyRow>
              <Text
                style={{ color: '#2A3152', fontSize: 24, fontWeight: 'bold' }}
              >
                Aprenda a usar
              </Text>
              <Text style={{ color: '#7244d4', fontSize: 18 }}>
                Clique aqui e veja rapidamento como usar o seu aplicativo.
              </Text>
              <Text style={{ color: '#7244d4', fontSize: 18 }}>
                Se preferir, leia aqui as perguntas mais frequentes que nossos
                usuários fazem.
              </Text>

              <BodyRow>
                <Divisor />
              </BodyRow>

              <BodyRow>
                <ButtonNext state>
                  <ButtonNextText>LEVE-ME AO APLICATIVO</ButtonNextText>
                </ButtonNext>
              </BodyRow>
            </BlockBody>
          </View>

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
              <StepText>Finalizar</StepText>
            </FooterStep>
          </BlockFooter>
        </View>
      </ScrollView>
    </Container>
  );
}
