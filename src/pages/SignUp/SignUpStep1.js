import React, { useCallback, useState } from 'react';
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
  InputDatePicker,
  InputMasked,
  InputContainer,
  InputTitle,
  StepNumber,
  StepText,
  TermsCheckBox,
} from './styles';

export default function SignUpStep1({ navigation }) {
  const { showActionSheetWithOptions } = useActionSheet();
  const [avatar, setAvatar] = useState('');
  const [checked, setChecked] = useState(false);
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');

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
                <InputMasked
                  onChangeText={e => setPhone(e)}
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
                <Input secureTextEntry />
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
      </FormContainer>
    </Container>
  );
}
