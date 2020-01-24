import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { useActionSheet } from '@expo/react-native-action-sheet';
import {
  BlockBody,
  BlockFooter,
  BlockHeader,
  BodyText,
  BodyTitle,
  ButtonInput,
  ButtonNext,
  ButtonNextText,
  ButtonSignUpFacebook,
  ButtonSignUpFacebookIcon,
  ButtonSignUpFacebookText,
  Container,
  Content,
  Div,
  Divisor,
  FooterStep,
  FrendleeProfilePicture,
  Gender,
  GenderImage,
  GenderText,
  HeaderLogo,
  HeaderSubTitle,
  HeaderTitle,
  Input,
  InputDatePicker,
  InputIcon,
  InputMasked,
  InputTitle,
  StepNumber,
  StepText,
  TermsCheckBox,
} from './styles';

export default function SignUpStep1({ navigation }) {
  const lastnameInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();

  const { showActionSheetWithOptions } = useActionSheet();
  const [avatar, setAvatar] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [buttonState, setButtonState] = useState(false);
  const [checked, setChecked] = useState(false);
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const selectAvatar = useCallback(async result => {
    const image = await ImageManipulator.manipulateAsync(result.uri, [
      { resize: { width: 400 } },
    ]);

    setAvatar(image.uri);
  }, []);

  const handleSelectAvatar = useCallback(() => {
    const options = ['Tirar foto', 'Buscar da galeria', 'Cancelar'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async buttonIndex => {
        let result;

        switch (buttonIndex) {
          case 0:
            if (Constants.platform.ios) {
              const { status } = await Permissions.askAsync(
                Permissions.CAMERA,
                Permissions.CAMERA_ROLL
              );

              if (status !== 'granted') {
                Alert.alert(
                  'Eita!',
                  'Precisamos da permissão da câmera para você tirar uma foto'
                );
                break;
              }
            }

            result = await ImagePicker.launchCameraAsync({
              mediaTypes: 'Images',
              aspect: [1, 1],
              allowsEditing: true,
              quality: 0.8,
            });

            if (result.cancelled) {
              break;
            }

            selectAvatar(result);

            break;
          case 1:
            if (Constants.platform.ios) {
              const { status } = await Permissions.askAsync(
                Permissions.CAMERA_ROLL
              );

              if (status !== 'granted') {
                Alert.alert(
                  'Eita!',
                  'Precisamos da permissão da galeria para selecionar uma imagem'
                );
                break;
              }
            }

            result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: 'Images',
              aspect: [1, 1],
              allowsEditing: true,
              quality: 0.8,
            });

            if (result.cancelled) {
              break;
            }

            selectAvatar(result);

            break;
          default:
            break;
        }
      }
    );
  }, []);

  useEffect(() => {
    const regex = new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})'
    );
    setValidPassword(regex.test(password));
  }, [password, validPassword]);

  useEffect(() => {
    if (
      avatar &&
      birthdate &&
      checked &&
      gender &&
      email &&
      name &&
      lastname &&
      phone &&
      password &&
      validPassword
    ) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [
    avatar,
    birthdate,
    checked,
    gender,
    email,
    name,
    lastname,
    phone,
    password,
    validPassword,
  ]);

  return (
    <Container>
      <Content>
        <BlockHeader>
          <HeaderLogo />
          <HeaderTitle>CREATE ACCOUNT</HeaderTitle>
          <HeaderSubTitle>
            Texto de boas vindas ao novo usuário do Frendlee. Explica que pode
            iniciar o cadastro com as redes sociais ou preencher manualmente.
          </HeaderSubTitle>
          <ButtonSignUpFacebook>
            <ButtonSignUpFacebookText>
              Signup with Facebook
            </ButtonSignUpFacebookText>
            <ButtonSignUpFacebookIcon />
          </ButtonSignUpFacebook>
        </BlockHeader>

        <BlockBody>
          <Divisor />

          <BodyTitle>Profile</BodyTitle>
          <Div>
            <Div direction="column" justify="flex-start" marginBottom>
              <InputTitle>Profile selfie</InputTitle>
              <Div direction="row" justify="space-between">
                <Div width="20%">
                  <TouchableWithoutFeedback onPress={handleSelectAvatar}>
                    <FrendleeProfilePicture source={{ uri: avatar }} />
                  </TouchableWithoutFeedback>
                </Div>

                <Div align="center" justify="center" width="80%">
                  <BodyText>
                    Use a selfie where your face can be seen clearly,
                    preferably.
                  </BodyText>
                </Div>
              </Div>
            </Div>

            <Div direction="row" justify="space-between" marginBottom>
              <Div width="48%">
                <InputTitle>Name</InputTitle>
                <Input
                  autoCapitalize="words"
                  autoCorrect={false}
                  onChangeText={setName}
                  onSubmitEditing={() => lastnameInputRef.current.focus()}
                  returnKeyType="next"
                  value={name}
                />
              </Div>

              <Div width="48%">
                <InputTitle>Lastname</InputTitle>
                <Input
                  autoCapitalize="words"
                  autoCorrect={false}
                  onChangeText={setLastname}
                  onSubmitEditing={() => emailInputRef.current.focus()}
                  ref={lastnameInputRef}
                  returnKeyType="next"
                  value={lastname}
                />
              </Div>
            </Div>

            <Div direction="column" justify="flex-start" marginBottom>
              <InputTitle>E-mail</InputTitle>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={setEmail}
                onSubmitEditing={() =>
                  phoneInputRef.current._inputElement.focus()
                }
                ref={emailInputRef}
                returnKeyType="next"
                value={email}
              />
            </Div>

            <Div direction="row" justify="space-between" marginBottom>
              <Div width="48%">
                <InputTitle>Telephone</InputTitle>
                <InputMasked
                  onChangeText={setPhone}
                  ref={phoneInputRef}
                  refInput={phoneInputRef}
                  type="cel-phone"
                  value={phone}
                />
              </Div>

              <Div width="48%">
                <InputTitle>Date of birth</InputTitle>
                <InputDatePicker onDateChange={setBirthdate} date={birthdate} />
              </Div>
            </Div>

            <Div direction="column" justify="flex-start">
              <InputTitle>Gender</InputTitle>
              <Div direction="row" justify="space-between">
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
              </Div>
            </Div>
          </Div>

          <Divisor />

          <BodyTitle>Password</BodyTitle>
          <Div>
            <Div direction="column" justify="flex-start">
              <InputTitle>Choose your password</InputTitle>
              <Div align="center" direction="row" marginBottom>
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={setPassword}
                  secureTextEntry={!passwordVisible}
                  value={password}
                />
                <ButtonInput
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <InputIcon visible={passwordVisible} />
                </ButtonInput>
              </Div>
              <BodyText>
                Minimum of 8 characters. Use letters and numbers.
              </BodyText>
            </Div>
          </Div>

          <Divisor />

          <Div>
            <Div direction="row" marginBottom>
              <Div width="12%">
                <TermsCheckBox
                  checked={checked}
                  onPress={() => setChecked(!checked)}
                />
              </Div>
              <Div width="88%">
                <BodyText>
                  To proceed, you need to agree with our{' '}
                  <BodyText
                    color="#7244d4"
                    decoration="underline"
                    weight="bold"
                  >
                    Terms of use
                  </BodyText>
                  .
                </BodyText>
              </Div>
            </Div>

            <Div direction="column" marginBottom>
              <ButtonNext
                state={buttonState}
                onPress={() => navigation.navigate('SignUpStep2')}
              >
                <ButtonNextText>NEXT STEP</ButtonNextText>
              </ButtonNext>
            </Div>
          </Div>
        </BlockBody>

        <BlockFooter>
          <FooterStep selected>
            <StepNumber selected>1</StepNumber>
            <StepText>Profile</StepText>
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
