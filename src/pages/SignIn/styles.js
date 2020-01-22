import { Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');

export const Background = styled.ImageBackground.attrs(() => ({
  source: require('../../../assets/splash.png'),
}))`
  flex: 1;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const FacebookButton = styled(RectButton)`
  align-items: center;
  background-color: #3b5998;
  border-radius: 4px;
  height: 48px;
  justify-content: center;
  width: 48px;
`;

export const FacebookButtonText = styled.Text`
  color: #ffffff;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 1px;
  line-height: 23px;
`;

export const FormContainer = styled.KeyboardAvoidingView.attrs(() => ({
  behavior: 'position',
  enabled: Platform.OS === 'ios',
  contentContainerStyle: {
    paddingBottom: 20,
  },
}))`
  flex: 1;
  justify-content: flex-end;
  margin: 0 40px;
  ${() =>
    Platform.OS === 'ios' && height >= 812
      ? {
          'margin-bottom': '70px',
        }
      : {}}}
`;

export const Input = styled.TextInput.attrs(() => ({
  placeholderTextColor: '#3b446d',
}))`
  align-items: center;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  color: #3b446d;
  height: 48px;
  font-size: 20px;
  padding: 0 10px;
`;

export const InputContainer = styled.View`
  padding: 0 0 12px;
`;

export const SignInButton = styled(RectButton)`
  align-items: center;
  background-color: #7244d4;
  border-radius: 4px;
  height: 48px;
  justify-content: center;
  width: 75%;
`;

export const SignInButtonText = styled.Text`
  color: #ffffff;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 1px;
  line-height: 23px;
`;

export const SignUpButton = styled(RectButton)`
  align-items: center;
  background-color: #4c476f;
  height: 70px;
  justify-content: center;
  ${() =>
    Platform.OS === 'ios' && height >= 812
      ? {
          bottom: 0,
          height: '100px',
          left: 0,
          right: 0,
          position: 'absolute',
        }
      : {}}}
`;

export const SignUpButtonText = styled.Text`
  color: #ffffff;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 1px;
  line-height: 23px;
`;
