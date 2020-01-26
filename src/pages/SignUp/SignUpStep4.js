import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
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

import { signInRequest } from '../../store/modules/auth/actions';
import api from '../../services/api';

export default function SignUpStep4({ navigation }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    try {
      setLoading(true);
      const data = await navigation.getParam('data');
      const formData = new FormData();

      formData.append('picture_profile', data.picture_profile);
      delete data.picture_profile;

      const { data: customer } = await api.post('/customers', data);
      api.defaults.headers.common.Authorization = `Bearer ${customer.token}`;

      const { id } = customer;
      await api.post(`/customers/${id}/files`, formData);

      dispatch(signInRequest(customer.user.email, customer.user.password));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

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

          <BodyTitle>Preferences and settings</BodyTitle>
          <BodyText color="#7244d4">Preferências e ajustes</BodyText>

          <Divisor />

          <BodyTitle>Payment</BodyTitle>
          <BodyText color="#7244d4">
            Enter your payment details now and save time.
          </BodyText>
          <BodyText color="#302d46">
            Your data is insecure, you can trust it. If you prefer, do it later
            or make your payments in cash, without complication.
          </BodyText>

          <Divisor />

          <BodyTitle>Learn to use</BodyTitle>
          <BodyText color="#7244d4">
            Click here and quickly see how to use your application.
          </BodyText>
          <BodyText color="#302d46">
            If you prefer, read here the most frequently asked questions that
            our users ask.
          </BodyText>

          <Divisor />

          <Div>
            <ButtonNext enabled={!loading} onPress={handleSignUp} state>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <ButtonNextText>TAKE ME TO THE APP</ButtonNextText>
              )}
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
