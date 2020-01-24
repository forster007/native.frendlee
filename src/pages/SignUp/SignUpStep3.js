import React, { useState } from 'react';
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

export default function SignUpStep3({ navigation }) {
  const [pressure, setPressure] = useState('normal');

  const [optionA, setOptionA] = useState(false);
  const [optionB, setOptionB] = useState(false);
  const [optionC, setOptionC] = useState(false);

  return (
    <Container>
      <FormContainer>
        <Content>
          <BlockHeader>
            <FrendleeLogo />
            <HeaderSubTitle>
              Precisamos saber um pouco mais sobre você. Preencha por favor,
              algumas informações sobre sua saúde.
            </HeaderSubTitle>
          </BlockHeader>

          <BlockBody>
            <BodyTitle>Dados Médicos</BodyTitle>
            <BodyRow>
              <InputTitle>Pressão</InputTitle>
              <ButtonGroup>
                <ButtonGroupOption
                  onPress={() => setPressure('baixa')}
                  selected={pressure === 'baixa'}
                >
                  <ButtonGroupText selected={pressure === 'baixa'}>
                    Baixa
                  </ButtonGroupText>
                </ButtonGroupOption>
                <ButtonGroupOption
                  onPress={() => setPressure('normal')}
                  selected={pressure === 'normal'}
                >
                  <ButtonGroupText selected={pressure === 'normal'}>
                    Normal
                  </ButtonGroupText>
                </ButtonGroupOption>
                <ButtonGroupOption
                  onPress={() => setPressure('alta')}
                  selected={pressure === 'alta'}
                >
                  <ButtonGroupText selected={pressure === 'alta'}>
                    Alta
                  </ButtonGroupText>
                </ButtonGroupOption>
              </ButtonGroup>
            </BodyRow>

            <BodyRow>
              <InputTitle>Restrições Médicas</InputTitle>
              <ButtonContainer direction="column">
                <Button onPress={() => setOptionA(!optionA)} selected={optionA}>
                  <ButtonText selected={optionA}>
                    Tenho doenças ou condições crônicas
                  </ButtonText>
                </Button>
              </ButtonContainer>
              <ButtonContainer>
                <Button onPress={() => setOptionB(!optionB)} selected={optionB}>
                  <ButtonText selected={optionB}>
                    Tenho alergias ou restrições
                  </ButtonText>
                </Button>
              </ButtonContainer>
              <ButtonContainer>
                <Button onPress={() => setOptionC(!optionC)} selected={optionC}>
                  <ButtonText selected={optionC}>
                    Estou em tratamento médico
                  </ButtonText>
                </Button>
              </ButtonContainer>
            </BodyRow>

            <BodyRow style={{ marginTop: 67 }}>
              <Divisor />
            </BodyRow>

            <BodyRow>
              <ButtonNext
                onPress={() => navigation.navigate('SignUpStep4')}
                state
              >
                <ButtonNextText>PRÓXIMA ETAPA</ButtonNextText>
              </ButtonNext>
            </BodyRow>
          </BlockBody>

          <BlockFooter>
            <FooterStep selected>
              <StepNumber>1</StepNumber>
            </FooterStep>
            <FooterStep selected>
              <StepNumber>2</StepNumber>
            </FooterStep>
            <FooterStep selected>
              <StepNumber selected>3</StepNumber>
              <StepText>Saúde</StepText>
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
