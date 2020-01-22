import React from 'react';
import {
  BlockBody,
  BlockFooter,
  BlockHeader,
  BodyRow,
  BodyText,
  BodyTitle,
  ButtonNext,
  ButtonNextText,
  Container,
  Content,
  Divisor,
  FooterStep,
  FormContainer,
  FrendleeLogo,
  HeaderSubTitle,
  Input,
  InputContainer,
  InputTitle,
  StepNumber,
  StepText,
} from './styles';

export default function SignUpStep2() {
  return (
    <Container>
      <FormContainer>
        <Content>
          <BlockHeader>
            <FrendleeLogo />
            <HeaderSubTitle>
              Agora, preencha seu endereço. Fique tranquilo, esta informação
              somente será compartilhada com o Frendlee contratado após você
              fechar negócio!
            </HeaderSubTitle>
          </BlockHeader>

          <BlockBody>
            <BodyTitle>Endereço</BodyTitle>
            <BodyRow row>
              <InputContainer row>
                <InputTitle>CEP</InputTitle>
                <Input />
              </InputContainer>
              <InputContainer row>
                <BodyText style={{ fontSize: 14, top: 25 }}>
                  Digite seu CEP e confirme seu endereço
                </BodyText>
              </InputContainer>
            </BodyRow>

            <BodyRow>
              <InputContainer>
                <InputTitle>Logradouro (Rua, Avenida)</InputTitle>
                <Input />
              </InputContainer>
            </BodyRow>

            <BodyRow row>
              <InputContainer row width="30%">
                <InputTitle>Número</InputTitle>
                <Input />
              </InputContainer>
              <InputContainer row width="64%">
                <InputTitle>Complemento</InputTitle>
                <Input />
              </InputContainer>
            </BodyRow>

            <BodyRow row>
              <InputContainer row width="30%">
                <InputTitle>UF</InputTitle>
                <Input />
              </InputContainer>
              <InputContainer row width="64%">
                <InputTitle>Cidade</InputTitle>
                <Input />
              </InputContainer>
            </BodyRow>

            <BodyRow>
              <Divisor />
            </BodyRow>

            <BodyRow>
              <ButtonNext>
                <ButtonNextText>PRÓXIMA ETAPA</ButtonNextText>
              </ButtonNext>
            </BodyRow>
          </BlockBody>

          <BlockFooter>
            <FooterStep selected>
              <StepNumber>1</StepNumber>
            </FooterStep>
            <FooterStep selected>
              <StepNumber selected>2</StepNumber>
              <StepText>Endereço</StepText>
            </FooterStep>
            <FooterStep>
              <StepNumber>3</StepNumber>
            </FooterStep>
            <FooterStep>
              <StepNumber>4</StepNumber>
            </FooterStep>
          </BlockFooter>
        </Content>
      </FormContainer>
    </Container>
  );
}
