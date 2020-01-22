import React, { useState } from 'react';
import {
  BlockBody,
  BlockFooter,
  BlockHeader,
  BodyRow,
  BodyText,
  BodyTextPurple,
  BodyTitle,
  ButtonNext,
  ButtonNextText,
  Container,
  Content,
  Divisor,
  FacebookButton,
  FacebookButtonIcon,
  FacebookButtonText,
  FrendleeLogo,
  FooterStep,
  Gender,
  GenderImage,
  GenderText,
  HeaderSubTitle,
  HeaderTitle,
  Input,
  InputContainer,
  InputTitle,
  StepNumber,
  StepText,
} from './styles';

export default function SignUpStep1({ navigation }) {
  const [gender, setGender] = useState('');

  return (
    <Container>
      <Content>
        <BlockHeader>
          <FrendleeLogo />
          <HeaderTitle>Criar nova conta</HeaderTitle>
          <HeaderSubTitle>
            Texto de boas vindas ao novo usuário do Frendlee. Explica que pode
            iniciar o cadastro com as redes sociais ou preencher manualmente.
          </HeaderSubTitle>
          <FacebookButton>
            <FacebookButtonText>Criar conta com Facebook</FacebookButtonText>
            <FacebookButtonIcon />
          </FacebookButton>

          <Divisor />
        </BlockHeader>

        <BlockBody>
          <BodyTitle>Perfil</BodyTitle>
          <BodyRow row>
            <InputContainer row>
              <InputTitle>Nome</InputTitle>
              <Input />
            </InputContainer>
            <InputContainer row>
              <InputTitle>Sobrenome</InputTitle>
              <Input />
            </InputContainer>
          </BodyRow>

          <BodyRow>
            <InputContainer>
              <InputTitle>E-mail</InputTitle>
              <Input />
            </InputContainer>
          </BodyRow>

          <BodyRow row>
            <InputContainer row>
              <InputTitle>Telefone celular</InputTitle>
              <Input />
            </InputContainer>
            <InputContainer row>
              <InputTitle>Data de nascimento</InputTitle>
              <Input />
            </InputContainer>
          </BodyRow>

          <BodyRow>
            <InputTitle style={{ marginBottom: 0 }}>Gênero</InputTitle>
            <BodyRow row>
              <Gender
                onPress={() => setGender('female')}
                genderSelected={gender === 'female'}
              >
                <GenderImage gender="female" />
                <GenderText genderSelected={gender === 'female'}>
                  Feminino
                </GenderText>
              </Gender>
              <Gender
                onPress={() => setGender('male')}
                genderSelected={gender === 'male'}
              >
                <GenderImage gender="male" />
                <GenderText genderSelected={gender === 'male'}>
                  Masculino
                </GenderText>
              </Gender>
            </BodyRow>
            <Divisor />
          </BodyRow>

          <BodyTitle>Senha</BodyTitle>
          <BodyRow>
            <InputContainer>
              <InputTitle>Escolha uma senha</InputTitle>
              <Input secureTextEntry />
            </InputContainer>
            <BodyText>
              Mínimo de 8 caracteres. Utilize letras e números.
            </BodyText>

            <Divisor />
          </BodyRow>

          <BodyRow row>
            <BodyText>
              Para prosseguir, concorde com nossos{' '}
              <BodyTextPurple>Termos de Uso</BodyTextPurple>.
            </BodyText>
          </BodyRow>

          <BodyRow>
            <ButtonNext onPress={() => navigation.navigate('SignUpStep2')}>
              <ButtonNextText>PRÓXIMA ETAPA</ButtonNextText>
            </ButtonNext>
          </BodyRow>
        </BlockBody>

        <BlockFooter>
          <FooterStep selected>
            <StepNumber selected>1</StepNumber>
            <StepText>Perfil</StepText>
          </FooterStep>
          <FooterStep>
            <StepNumber>2</StepNumber>
          </FooterStep>
          <FooterStep>
            <StepNumber>3</StepNumber>
          </FooterStep>
          <FooterStep>
            <StepNumber>4</StepNumber>
          </FooterStep>
        </BlockFooter>
      </Content>
    </Container>
  );
}
