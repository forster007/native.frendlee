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
  Input,
  InputTitle,
  StepNumber,
  StepText,
} from './styles';

export default function SignUpStep2({ navigation }) {
  return (
    <Container>
      <Content>
        <BlockHeader>
          <HeaderLogo />
          <HeaderSubTitle>
            Now, fill in your address. Rest assured, this information will only
            be shared with the hired Frendlee after you close business!
          </HeaderSubTitle>
        </BlockHeader>

        <BlockBody>
          <Divisor />

          <BodyTitle>Address</BodyTitle>
          <Div>
            <Div
              align="center"
              direction="row"
              justify="space-between"
              marginBottom
            >
              <Div width="40%">
                <InputTitle>Zip code</InputTitle>
                <Input />
              </Div>

              <Div width="56%">
                <BodyText style={{ top: 15 }}>
                  Enter your zip code and confirm your address
                </BodyText>
              </Div>
            </Div>

            <Div>
              <Div direction="column" justify="flex-start" marginBottom>
                <InputTitle>Street</InputTitle>
                <Input />
              </Div>
            </Div>

            <Div direction="row" justify="space-between" marginBottom>
              <Div width="30%">
                <InputTitle>Number</InputTitle>
                <Input />
              </Div>

              <Div width="66%">
                <InputTitle>Complement</InputTitle>
                <Input />
              </Div>
            </Div>

            <Div direction="row" justify="space-between">
              <Div width="30%">
                <InputTitle>State</InputTitle>
                <Input />
              </Div>

              <Div width="66%">
                <InputTitle>City</InputTitle>
                <Input />
              </Div>
            </Div>
          </Div>

          <Divisor />

          <Div>
            <ButtonNext
              state
              onPress={() => navigation.navigate('SignUpStep3')}
            >
              <ButtonNextText>NEXT STEP</ButtonNextText>
            </ButtonNext>
          </Div>
        </BlockBody>

        <BlockFooter>
          <FooterStep selected>
            <StepNumber>1</StepNumber>
          </FooterStep>
          <FooterStep selected>
            <StepNumber selected>2</StepNumber>
            <StepText>Address</StepText>
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
