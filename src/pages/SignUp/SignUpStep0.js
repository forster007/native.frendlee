import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  BlockBody,
  BlockHeader,
  BodyTitle,
  ButtonNext,
  ButtonNextText,
  Container,
  Content,
  Div,
  Divisor,
  Gender,
  GenderImage,
  GenderText,
  HeaderLogo,
  HeaderSubTitle,
  HeaderTitle,
} from './styles';

export default function SignUpStep0({ navigation }) {
  const [account_type, setAccountType] = useState('');
  const [buttonState, setButtonState] = useState(false);
  const [gender, setGender] = useState('');

  const handleNext = useCallback(() => {
    navigation.navigate('SignUpStep1', { account_type });
  });

  useEffect(() => {
    if (gender) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [gender]);

  return (
    <Container>
      <Content justify="flex-start">
        <BlockHeader>
          <HeaderLogo />
          <HeaderTitle>CREATE ACCOUNT</HeaderTitle>
          <HeaderSubTitle>
            Welcome text to the new Frendlee user. Explains that you can start
            registration with social networks or fill in manually.
          </HeaderSubTitle>
        </BlockHeader>

        <BlockBody>
          <Divisor />

          <BodyTitle>Choose your profile</BodyTitle>

          <Div>
            <Div direction="column" justify="flex-start">
              <Div direction="row" justify="space-between">
                <Gender
                  onPress={() => {
                    setGender('user');
                    setAccountType('customer');
                  }}
                  genderSelected={gender === 'user'}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <GenderImage gender="user-1" />
                    <GenderImage gender="user-2" />
                  </View>
                  <GenderText genderSelected={gender === 'user'}>
                    User
                  </GenderText>
                </Gender>
                <Gender
                  onPress={() => {
                    setGender('parent');
                    setAccountType('parent');
                  }}
                  genderSelected={gender === 'parent'}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <GenderImage gender="parent-1" />
                    <GenderImage gender="parent-2" />
                  </View>
                  <GenderText genderSelected={gender === 'parent'}>
                    Relative
                  </GenderText>
                </Gender>
              </Div>
            </Div>
          </Div>

          <Divisor />

          <Div direction="column" marginBottom>
            <ButtonNext state={buttonState} onPress={handleNext}>
              <ButtonNextText>NEXT STEP</ButtonNextText>
            </ButtonNext>
          </Div>
        </BlockBody>
      </Content>
    </Container>
  );
}
