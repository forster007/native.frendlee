import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { getAddress } from '../../services/address';
import {
  BlockBody,
  BlockFooter,
  BlockHeader,
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
  const [city, setCity] = useState('');
  const [complement, setComplement] = useState('');
  const [country] = useState('Holland');
  const [district, setDistrict] = useState('');
  const [number, setNumber] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const [street, setStreet] = useState('');

  const handleAddress = useCallback(async () => {
    if (postalCode && number) {
      try {
        const { data } = await getAddress(postalCode, number);

        setCity(data.city);
        setDistrict(data.municipality);
        setState(data.province);
        setStreet(data.street);
      } catch (error) {
        Alert.alert('WARNING', error.response.data.exception);

        setCity('');
        setDistrict('');
        setState('');
        setStreet('');
      }
    }
  });

  const handleNext = useCallback(() => {
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
  });

  useEffect(() => {
    if (postalCode && number && street && district && city && state) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [postalCode, number, street, complement, district, city, state]);

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
            <Div direction="row" justify="space-between" marginBottom>
              <Div width="48%">
                <InputTitle>Postcode</InputTitle>
                <Input
                  autoCapitalize="characters"
                  maxLength={6}
                  minLength={6}
                  onBlur={handleAddress}
                  onChangeText={setPostalCode}
                  value={postalCode}
                />
              </Div>

              <Div width="48%">
                <InputTitle>House number</InputTitle>
                <Input
                  keyboardType="numeric"
                  onBlur={handleAddress}
                  onChangeText={setNumber}
                  value={number}
                />
              </Div>
            </Div>

            <Div direction="column" justify="flex-start" marginBottom>
              <InputTitle>Street</InputTitle>
              <Input
                disabled
                editable={false}
                onChangeText={setStreet}
                value={street}
              />
            </Div>

            <Div direction="column" justify="flex-start" marginBottom>
              <InputTitle>Complement</InputTitle>
              <Input onChangeText={setComplement} value={complement} />
            </Div>

            <Div direction="row" justify="space-between" marginBottom>
              <Div width="48%">
                <InputTitle>District</InputTitle>
                <Input
                  disabled
                  editable={false}
                  onChangeText={setDistrict}
                  value={district}
                />
              </Div>

              <Div width="48%">
                <InputTitle>City</InputTitle>
                <Input
                  disabled
                  editable={false}
                  onChangeText={setCity}
                  value={city}
                />
              </Div>
            </Div>

            <Div direction="column" justify="flex-start">
              <InputTitle>State</InputTitle>
              <Input
                disabled
                editable={false}
                onChangeText={setState}
                value={state}
              />
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
