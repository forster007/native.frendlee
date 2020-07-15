/* eslint-disable no-console */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { signInRequest } from '../../store/modules/auth/actions';
import { isEmail, isValidateBSN } from '../../services/helpers';
import {
  BlockBody,
  BlockFooter,
  BlockHeader,
  BodyText,
  BodyTitle,
  ButtonInput,
  ButtonNext,
  ButtonNextText,
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
  HeaderTitle,
  Input,
  InputDatePicker,
  InputIcon,
  InputTitle,
  StepNumber,
  StepText,
  TermsCheckBox,
} from './styles';
import api from '~/services/api';

export default function SignUpStep1({ navigation }) {
  const dispatch = useDispatch();
  const account_type = useMemo(() => navigation.getParam('account_type'), [
    navigation,
  ]);
  const { showActionSheetWithOptions } = useActionSheet();

  const bsnInputRef = useRef();
  const nameInputRef = useRef();
  const lastnameInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();

  const [pictureProfile, setPictureProfile] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [bsn, setBsn] = useState('');
  const [buttonState, setButtonState] = useState(false);
  const [checked, setChecked] = useState(false);
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [status] = useState('disabled');

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [validBsn, setValidBsn] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validPhone, setValidPhone] = useState(false);

  const handleAvatar = useCallback(async result => {
    const image = await ImageManipulator.manipulateAsync(result.uri, [], {
      compress: 0.4,
      format: ImageManipulator.SaveFormat.JPEG,
    });

    setPictureProfile(image.uri);
  });

  const handleImage = useCallback(() => {
    const options = ['Take a picture', 'Find on galery', 'Cancel'];
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
              const perm = await Permissions.askAsync(
                Permissions.CAMERA,
                Permissions.CAMERA_ROLL
              );

              if (perm.status !== 'granted') {
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
              quality: 0.4,
            });

            if (result.cancelled) {
              break;
            }

            handleAvatar(result);

            break;
          case 1:
            if (Constants.platform.ios) {
              const perm = await Permissions.askAsync(Permissions.CAMERA_ROLL);

              if (perm.status !== 'granted') {
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
              quality: 0.4,
            });

            if (result.cancelled) {
              break;
            }

            handleAvatar(result);

            break;
          default:
            break;
        }
      }
    );
  });

  const handleBSN = useCallback(async () => {
    if (bsn && bsn.length === 9 && isValidateBSN([...bsn])) {
      const { data } = await api.get(`/checks?field=bsn&value=${bsn}`);
      setValidBsn(data.available);

      if (data.available === false) {
        Alert.alert('WARNING', 'BSN already in use');
      }
    } else if (bsn && bsn.length === 9 && !isValidateBSN([...bsn])) {
      Alert.alert('WARNING', 'BSN invalid');
      setValidEmail(false);
    } else {
      setValidBsn(false);
    }
  });

  const handleEmail = useCallback(async () => {
    if (email && isEmail(email)) {
      const { data } = await api.get(`/checks?field=email&value=${email}`);
      setValidEmail(data.available);

      if (data.available === false) {
        Alert.alert('WARNING', 'EMAIL already in use');
      }
    } else if (email && !isEmail(email)) {
      Alert.alert('WARNING', 'EMAIL invalid');
      setValidEmail(false);
    } else {
      setValidEmail(false);
    }
  });

  const handleNext = useCallback(() => {
    const filenamePictureProfile = pictureProfile.split('/').pop();

    const data = {
      birthdate: `${birthdate}T00:00:00-03:00`,
      gender,
      lastname,
      name,
      phone_number: phone,
      phone_number_is_whatsapp: true,
      ssn: bsn,
      user: {
        account_type,
        email,
        password,
        status,
      },
      picture_profile: {
        uri: pictureProfile,
        name: filenamePictureProfile,
        type: 'image/jpg',
      },
    };

    navigation.navigate('SignUpStep2', { data });
  });

  const handlePhone = useCallback(async () => {
    if (phone && phone.length >= 6) {
      const { data } = await api.get(
        `/checks?field=phone_number&value=${phone}`
      );
      setValidPhone(data.available);

      if (data.available === false) {
        Alert.alert('WARNING', 'PHONE already in use');
      }
    } else if (phone && phone.length < 6) {
      Alert.alert('WARNING', 'PHONE invalid');
      setValidPhone(false);
    } else {
      setValidPhone(false);
    }
  });

  const handleSignUp = useCallback(async () => {
    try {
      setLoading(true);
      const filenamePictureProfile = pictureProfile.split('/').pop();

      const data = {
        birthdate: `${birthdate}T00:00:00-03:00`,
        gender,
        lastname,
        name,
        phone_number: phone,
        phone_number_is_whatsapp: true,
        ssn: bsn,
        user: {
          account_type,
          email,
          password,
          status,
        },
        picture_profile: {
          uri: pictureProfile,
          name: filenamePictureProfile,
          type: 'image/jpg',
        },
      };

      const formData = new FormData();

      formData.append('picture_profile', data.picture_profile);
      delete data.picture_profile;

      const { data: parent } = await api.post('/parents', data);
      api.defaults.headers.common.Authorization = `Bearer ${parent.token}`;

      await api.post(`/parents/${parent.id}/files`, formData);

      dispatch(signInRequest(parent.user.email, parent.user.password));
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  });

  useEffect(() => {
    if (bsn && bsn.length !== 9) {
      setValidBsn(false);
    }
  }, [bsn, validBsn]);

  useEffect(() => {
    if (email && !isEmail(email)) {
      setValidEmail(false);
    }
  }, [email, validEmail]);

  useEffect(() => {
    if (phone && phone.length < 6) {
      setValidPhone(false);
    }
  }, [phone, validPhone]);

  useEffect(() => {
    const regex = new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})'
    );
    setValidPassword(regex.test(password));
  }, [password, validPassword]);

  useEffect(() => {
    if (account_type === 'customer') {
      if (
        pictureProfile &&
        birthdate &&
        checked &&
        gender &&
        email &&
        name &&
        lastname &&
        password &&
        phone &&
        validBsn &&
        validEmail &&
        validPassword &&
        validPhone
      ) {
        setButtonState(true);
      } else {
        setButtonState(false);
      }
    } else if (account_type === 'parent') {
      if (
        pictureProfile &&
        birthdate &&
        checked &&
        gender &&
        email &&
        name &&
        lastname &&
        password &&
        phone &&
        validEmail &&
        validPassword &&
        validPhone
      ) {
        setButtonState(true);
      } else {
        setButtonState(false);
      }
    }
  }, [
    pictureProfile,
    birthdate,
    checked,
    gender,
    email,
    name,
    lastname,
    password,
    phone,
    validBsn,
    validEmail,
    validPassword,
    validPhone,
  ]);

  const renderContent = useCallback(() => {
    switch (account_type) {
      case 'customer': {
        return (
          <Content>
            <BlockHeader>
              <HeaderLogo />
              <HeaderTitle>Create user account</HeaderTitle>
            </BlockHeader>

            <BlockBody>
              <Divisor />

              <BodyTitle>Document</BodyTitle>
              <Div align="center" direction="row">
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="numeric"
                  maxLength={9}
                  onBlur={handleBSN}
                  onChangeText={setBsn}
                  onSubmitEditing={() => nameInputRef.current.focus()}
                  ref={bsnInputRef}
                  returnKeyType="next"
                  value={bsn}
                />
                <ButtonInput>
                  <InputIcon
                    color={validBsn ? '#7244d4' : '#afafaf'}
                    icon="check-circle-o"
                    size={30}
                  />
                </ButtonInput>
              </Div>

              <Divisor />

              <BodyTitle>Profile</BodyTitle>
              <Div>
                <Div direction="column" justify="flex-start" marginBottom>
                  <InputTitle>Profile selfie</InputTitle>
                  <Div direction="row" justify="space-between">
                    <Div width="20%">
                      <TouchableWithoutFeedback onPress={handleImage}>
                        <FrendleeProfilePicture
                          source={{ uri: pictureProfile }}
                        />
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
                      ref={nameInputRef}
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
                  <Div align="center" direction="row">
                    <Input
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="email-address"
                      onBlur={handleEmail}
                      onChangeText={setEmail}
                      onSubmitEditing={() => phoneInputRef.current.focus()}
                      ref={emailInputRef}
                      returnKeyType="next"
                      value={email}
                    />
                    <ButtonInput>
                      <InputIcon
                        color={validEmail ? '#7244d4' : '#afafaf'}
                        icon="check-circle-o"
                        size={30}
                      />
                    </ButtonInput>
                  </Div>
                </Div>

                <Div direction="row" justify="space-between" marginBottom>
                  <Div width="48%">
                    <InputTitle>Telephone</InputTitle>
                    <Div align="center" direction="row">
                      <Input
                        onBlur={handlePhone}
                        onChangeText={setPhone}
                        ref={phoneInputRef}
                        keyboardType="numeric"
                        value={phone}
                      />
                      <ButtonInput>
                        <InputIcon
                          color={validPhone ? '#7244d4' : '#afafaf'}
                          icon="check-circle-o"
                          size={30}
                        />
                      </ButtonInput>
                    </Div>
                  </Div>

                  <Div width="48%">
                    <InputTitle>Date of birth</InputTitle>
                    <InputDatePicker
                      onDateChange={setBirthdate}
                      date={birthdate}
                    />
                  </Div>
                </Div>

                <Div direction="column" justify="flex-start">
                  <InputTitle>Gender</InputTitle>
                  <Div direction="row" justify="space-between">
                    <Gender
                      onPress={() => setGender('female')}
                      genderSelected={gender === 'female'}
                    >
                      <GenderImage gender="user-1" />
                      <GenderText genderSelected={gender === 'female'}>
                        Female
                      </GenderText>
                    </Gender>
                    <Gender
                      onPress={() => setGender('male')}
                      genderSelected={gender === 'male'}
                    >
                      <GenderImage gender="user-2" />
                      <GenderText genderSelected={gender === 'male'}>
                        Male
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
                  <Div justify="center" width="88%">
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
                  <ButtonNext state={buttonState} onPress={handleNext}>
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
        );
      }

      case 'parent': {
        return (
          <Content>
            <BlockHeader>
              <HeaderLogo />
              <HeaderTitle>Create parent account</HeaderTitle>
            </BlockHeader>

            <BlockBody>
              <Divisor />

              <BodyTitle>Profile</BodyTitle>
              <Div>
                <Div direction="column" justify="flex-start" marginBottom>
                  <InputTitle>Profile selfie</InputTitle>
                  <Div direction="row" justify="space-between">
                    <Div width="20%">
                      <TouchableWithoutFeedback onPress={handleImage}>
                        <FrendleeProfilePicture
                          source={{ uri: pictureProfile }}
                        />
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
                      ref={nameInputRef}
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
                  <Div align="center" direction="row">
                    <Input
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="email-address"
                      onBlur={handleEmail}
                      onChangeText={setEmail}
                      onSubmitEditing={() => phoneInputRef.current.focus()}
                      ref={emailInputRef}
                      returnKeyType="next"
                      value={email}
                    />
                    <ButtonInput>
                      <InputIcon
                        color={validEmail ? '#7244d4' : '#afafaf'}
                        icon="check-circle-o"
                        size={30}
                      />
                    </ButtonInput>
                  </Div>
                </Div>

                <Div direction="row" justify="space-between" marginBottom>
                  <Div width="48%">
                    <InputTitle>Telephone</InputTitle>
                    <Div align="center" direction="row">
                      <Input
                        onBlur={handlePhone}
                        onChangeText={setPhone}
                        ref={phoneInputRef}
                        keyboardType="numeric"
                        value={phone}
                      />
                      <ButtonInput>
                        <InputIcon
                          color={validPhone ? '#7244d4' : '#afafaf'}
                          icon="check-circle-o"
                          size={30}
                        />
                      </ButtonInput>
                    </Div>
                  </Div>

                  <Div width="48%">
                    <InputTitle>Date of birth</InputTitle>
                    <InputDatePicker
                      onDateChange={setBirthdate}
                      date={birthdate}
                    />
                  </Div>
                </Div>

                <Div direction="column" justify="flex-start">
                  <InputTitle>Gender</InputTitle>
                  <Div direction="row" justify="space-between">
                    <Gender
                      onPress={() => setGender('female')}
                      genderSelected={gender === 'female'}
                    >
                      <GenderImage gender="parent-2" />
                      <GenderText genderSelected={gender === 'female'}>
                        Female
                      </GenderText>
                    </Gender>
                    <Gender
                      onPress={() => setGender('male')}
                      genderSelected={gender === 'male'}
                    >
                      <GenderImage gender="parent-1" />
                      <GenderText genderSelected={gender === 'male'}>
                        Male
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
                  <Div justify="center" width="88%">
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
                    enabled={!loading}
                    onPress={handleSignUp}
                    state={buttonState}
                  >
                    {loading ? (
                      <ActivityIndicator />
                    ) : (
                      <ButtonNextText>TAKE ME TO THE APP</ButtonNextText>
                    )}
                  </ButtonNext>
                </Div>
              </Div>
            </BlockBody>
            <View style={{ marginBottom: 30 }} />
          </Content>
        );
      }

      default:
        return null;
    }
  });

  return <Container>{renderContent()}</Container>;
}
