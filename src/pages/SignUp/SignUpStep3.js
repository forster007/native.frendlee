import React, { useCallback, useState } from 'react';
import {
  BlockBody,
  BlockFooter,
  BlockHeader,
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
  Div,
  Divisor,
  FooterStep,
  HeaderLogo,
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

  function handleNext() {
    const data = navigation.getParam('data');

    data.blood_pressure = pressure;
    data.have_allergy = optionB;
    data.have_diseases = optionA;
    data.have_treatment = optionC;

    navigation.navigate('SignUpStep4', { data });
  }

  return (
    <Container>
      <Content>
        <BlockHeader>
          <HeaderLogo />
          <HeaderSubTitle>
            We need to know a little more about you. Please fill in some
            information about your health.
          </HeaderSubTitle>
        </BlockHeader>

        <BlockBody>
          <Divisor />

          <BodyTitle>Medical information</BodyTitle>
          <Div marginBottom>
            <InputTitle>Blood pressure</InputTitle>
            <ButtonGroup>
              <ButtonGroupOption
                onPress={() => setPressure('low')}
                selected={pressure === 'low'}
              >
                <ButtonGroupText selected={pressure === 'low'}>
                  Low
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
                onPress={() => setPressure('high')}
                selected={pressure === 'high'}
              >
                <ButtonGroupText selected={pressure === 'high'}>
                  High
                </ButtonGroupText>
              </ButtonGroupOption>
            </ButtonGroup>
          </Div>

          <Div>
            <InputTitle>Restrições Médicas</InputTitle>
            <ButtonContainer>
              <Button onPress={() => setOptionA(!optionA)} selected={optionA}>
                <ButtonText selected={optionA}>
                  I have chronic illnesses or conditions
                </ButtonText>
              </Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button onPress={() => setOptionB(!optionB)} selected={optionB}>
                <ButtonText selected={optionB}>
                  I have allergies or restrictions
                </ButtonText>
              </Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button onPress={() => setOptionC(!optionC)} selected={optionC}>
                <ButtonText selected={optionC}>
                  I am in medical treatment
                </ButtonText>
              </Button>
            </ButtonContainer>
          </Div>

          <Divisor />

          <Div>
            <ButtonNext state onPress={handleNext}>
              <ButtonNextText>NEXT STEP</ButtonNextText>
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
            <StepNumber selected>3</StepNumber>
            <StepText>Health</StepText>
          </FooterStep>
          <FooterStep>
            <StepNumber>4</StepNumber>
          </FooterStep>
        </BlockFooter>
      </Content>
    </Container>
  );
}
