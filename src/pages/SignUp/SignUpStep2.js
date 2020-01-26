import React, { useEffect, useState } from 'react';
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
  const [buttonState, setButtonState] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (
      postalCode &&
      street &&
      number &&
      district &&
      city &&
      state &&
      country
    ) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [postalCode, street, number, complement, district, city, state, country]);

  function handleNext() {
    const data = navigation.getParam('data');

    data.address = {
      postal_code: postalCode,
      street,
      number,
      complement,
      district,
      city,
      state,
      country,
    };

    navigation.navigate('SignUpStep3', { data });
  }

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
          <Div marginBottom>
            <Div
              align="center"
              direction="row"
              justify="space-between"
              marginBottom
            >
              <Div width="40%">
                <InputTitle>Postal code</InputTitle>
                <Input onChangeText={setPostalCode} value={postalCode} />
              </Div>

              <Div width="56%">
                <BodyText style={{ top: 15 }}>
                  Enter your zip code and confirm your address
                </BodyText>
              </Div>
            </Div>

            <Div direction="column" justify="flex-start" marginBottom>
              <InputTitle>Street</InputTitle>
              <Input onChangeText={setStreet} value={street} />
            </Div>

            <Div direction="row" justify="space-between" marginBottom>
              <Div width="30%">
                <InputTitle>Number</InputTitle>
                <Input onChangeText={setNumber} value={number} />
              </Div>

              <Div width="66%">
                <InputTitle>Complement</InputTitle>
                <Input onChangeText={setComplement} value={complement} />
              </Div>
            </Div>

            <Div direction="row" justify="space-between" marginBottom>
              <Div width="48%">
                <InputTitle>District</InputTitle>
                <Input onChangeText={setDistrict} value={district} />
              </Div>

              <Div width="48%">
                <InputTitle>City</InputTitle>
                <Input onChangeText={setCity} value={city} />
              </Div>
            </Div>

            <Div direction="row" justify="space-between">
              <Div width="66%">
                <InputTitle>State</InputTitle>
                <Input onChangeText={setState} value={state} />
              </Div>
              <Div width="30%">
                <InputTitle>Country</InputTitle>
                <Input onChangeText={setCountry} value={country} />
              </Div>
            </Div>

            <Divisor />

            <Div marginBotton>
              <ButtonNext state={buttonState} onPress={handleNext}>
                <ButtonNextText>NEXT STEP</ButtonNextText>
              </ButtonNext>
            </Div>
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
