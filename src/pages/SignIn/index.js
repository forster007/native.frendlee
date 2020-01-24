import React, { useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

import { signInRequest } from '../../store/modules/auth/actions';

import {
  Background,
  ButtonsContainer,
  Container,
  FacebookButton,
  FacebookButtonText,
  FormContainer,
  Input,
  InputContainer,
  SignInButton,
  SignInButtonText,
  SignUpButton,
  SignUpButtonText,
} from './styles';

function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn() {
    dispatch(signInRequest(email, password));
  }

  function handleSignUp() {
    navigation.navigate('SignUp');
  }

  return (
    <Background>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <FormContainer>
            <InputContainer>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholder="E-mail"
                value={email}
              />
            </InputContainer>
            <InputContainer>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
                value={password}
              />
            </InputContainer>
            <ButtonsContainer>
              <SignInButton onPress={handleSignIn}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <SignInButtonText>SIGNIN</SignInButtonText>
                )}
              </SignInButton>

              <FacebookButton>
                <FacebookButtonText>
                  <FontAwesome name="facebook" size={20} />
                </FacebookButtonText>
              </FacebookButton>
            </ButtonsContainer>
          </FormContainer>
          <SignUpButton onPress={handleSignUp}>
            <SignUpButtonText>CREATE ACCOUNT</SignUpButtonText>
          </SignUpButton>
        </Container>
      </TouchableWithoutFeedback>
    </Background>
  );
}

export default SignIn;
