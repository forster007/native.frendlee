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
  FooterStep,
  FormContainer,
  FrendleeLogo,
  FrendleeProfilePicture,
  Gender,
  GenderImage,
  GenderText,
  HeaderSubTitle,
  HeaderTitle,
  Input,
  InputButton,
  InputDatePicker,
  InputIcon,
  InputMasked,
  InputContainer,
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
      <FormContainer>
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
          </BlockHeader>

          <BlockBody>
            <BodyRow>
              <Divisor />
            </BodyRow>

            <BodyTitle>Perfil</BodyTitle>

            <BodyRow>
              <InputTitle style={{ marginBottom: 0 }}>
                Foto de Perfil
              </InputTitle>
              <BodyRow center row>
                <InputContainer row width="20%">
                  <TouchableWithoutFeedback onPress={handleSelectAvatar}>
                    <FrendleeProfilePicture source={{ uri: avatar }} />
                  </TouchableWithoutFeedback>
                </InputContainer>
                <InputContainer row width="80%">
                  <BodyText>
                    Utilize uma foto usa onde o seu rosto possa ser visto
                    claramente, de preferência.
                  </BodyText>
                </InputContainer>
              </BodyRow>
            </BodyRow>

            <BodyRow row>
              <InputContainer row>
                <InputTitle>Nome</InputTitle>
                <Input
                  autoCapitalize="words"
                  autoCorrect={false}
                  onChangeText={setName}
                  onSubmitEditing={() => lastnameInputRef.current.focus()}
                  returnKeyType="next"
                  value={name}
                />
              </InputContainer>
              <InputContainer row>
                <InputTitle>Sobrenome</InputTitle>
                <Input
                  autoCapitalize="words"
                  autoCorrect={false}
                  onChangeText={setLastname}
                  onSubmitEditing={() => emailInputRef.current.focus()}
                  ref={lastnameInputRef}
                  returnKeyType="next"
                  value={lastname}
                />
              </InputContainer>
            </BodyRow>

            <BodyRow>
              <InputContainer>
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
              </InputContainer>
            </BodyRow>

            <BodyRow row>
              <InputContainer row>
                <InputTitle>Telefone celular</InputTitle>
                <InputMasked
                  onChangeText={setPhone}
                  ref={phoneInputRef}
                  refInput={phoneInputRef}
                  type="cel-phone"
                  value={phone}
                />
              </InputContainer>
              <InputContainer row>
                <InputTitle>Data de nascimento</InputTitle>
                <InputDatePicker />
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
                <BodyRow center row>
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={setPassword}
                    secureTextEntry={!passwordVisible}
                    value={password}
                  />
                  <InputButton
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  >
                    <InputIcon visible={passwordVisible} />
                  </InputButton>
                </BodyRow>
              </InputContainer>
              <BodyText style={{ marginTop: 10 }}>
                Mínimo de 8 caracteres. Utilize letras e números.
              </BodyText>

              <Divisor />
            </BodyRow>

            <BodyRow row center>
              <InputContainer row width="10%">
                <TermsCheckBox
                  checked={checked}
                  onPress={() => setChecked(!checked)}
                />
              </InputContainer>
              <InputContainer row width="86%">
                <BodyText>
                  Para prosseguir, concorde com nossos{' '}
                  <BodyTextPurple>Termos de Uso</BodyTextPurple>.
                </BodyText>
              </InputContainer>
            </BodyRow>

            <BodyRow>
              <ButtonNext
                state={buttonState}
                onPress={() => navigation.navigate('SignUpStep2')}
              >
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
      </FormContainer>
    </Container>
  );
}
