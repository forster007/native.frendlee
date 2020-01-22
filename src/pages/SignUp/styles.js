import { Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';

const { height } = Dimensions.get('window');

export const BlockBody = styled.View`
  padding: 0 20px 10px 20px;
`;

export const BlockFooter = styled.View`
  background-color: #4c476f;
  flex-direction: row;
  height: ${Platform.OS === 'ios' && height >= 812 ? '150px' : '130px'};
  justify-content: space-between;
  width: 100%;
`;

export const BlockHeader = styled.View`
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

export const BodyRow = styled.View`
  justify-content: ${({ row }) => (row ? 'space-between' : 'flex-start')};
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
  padding: 10px 0;
`;

export const BodyText = styled.Text`
  color: #585175;
  font-size: 16px;
  margin-top: 10px;
`;

export const BodyTextPurple = styled.Text`
  color: #7244d4;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  text-decoration-line: underline;
`;

export const BodyTitle = styled.Text`
  color: #302d46;
  font-size: 30px;
`;

export const ButtonNext = styled(RectButton)`
  align-items: center;
  background-color: #7244d4;
  border-radius: 4px;
  height: 42px;
  justify-content: center;
  width: 100%;
`;

export const ButtonNextText = styled.Text`
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
`;

export const Container = styled.View`
  flex: 1;
  padding-top: ${Platform.OS === 'ios' && height >= 812 ? '50px' : '30px'};
`;

export const Content = styled.ScrollView.attrs({
  bounces: false,
  contentContainerStyle: {
    bottom: 0,
  },
  showsVerticalScrollIndicator: false,
})`
  bottom: 0;
`;

export const Divisor = styled.View`
  background-color: #cfc3d8;
  height: 1px;
  margin: 20px 0 0 0;
  width: 100%;
`;

export const FacebookButton = styled(RectButton)`
  align-items: center;
  background-color: #3b5998;
  border-radius: 4px;
  flex-direction: row;
  height: 42px;
  justify-content: space-between;
  margin: 25px 0 0 0;
  padding: 0 20px 0 20px;
  width: 100%;
`;

export const FacebookButtonIcon = styled(FontAwesome).attrs({
  color: '#ffffff',
  name: 'facebook',
  size: 20,
})``;

export const FacebookButtonText = styled.Text`
  color: #ffffff;
  font-size: 20px;
`;

export const FooterStep = styled.View`
  align-items: center;
  border-top-color: ${({ selected }) => (selected ? '#afaebf' : '#302d46')};
  border-top-width: 10px;
  justify-content: center;
  width: 25%;
`;

export const FormContainer = styled.KeyboardAvoidingView.attrs({
  behavior: 'position',
  enabled: Platform.OS === 'ios',
})`
  bottom: 0;
  overflow: hidden;
`;

export const FrendleeLogo = styled.Image.attrs({
  resizeMode: 'contain',
  source: require('../../../assets/frendlee-logo.png'),
})`
  height: 40px;
  width: 160px;
`;

export const Gender = styled(RectButton)`
  align-items: center;
  background-color: ${({ genderSelected }) =>
    genderSelected ? '#4c476f' : '#f2f2f2'};
  border: 2px solid
    ${({ genderSelected }) => (genderSelected ? '#302d46' : '#7244D4')};
  border-radius: 4px;
  height: 120px;
  justify-content: center;
  width: 47%;
`;

export const GenderImage = styled.Image.attrs(({ gender }) => {
  const male = require(`../../../assets/frendlee-gender-male.png`);
  const female = require(`../../../assets/frendlee-gender-female.png`);
  const source = gender === 'male' ? male : female;
  return { resizeMode: 'contain', source };
})`
  height: 65px;
  width: 65px;
`;

export const GenderText = styled.Text`
  color: ${({ genderSelected }) => (genderSelected ? '#f2f2f2' : '#7244D4')};
  font-size: 14px;
  margin: 5px 0 0 0;
`;

export const HeaderSubTitle = styled.Text`
  color: #4c476f;
  font-size: 18px;
  padding: 20px 0;
  text-align: center;
`;

export const HeaderTitle = styled.Text`
  color: #4c476f;
  font-size: 24px;
  font-weight: bold;
  padding: 15px 0 0px;
`;

export const Input = styled.TextInput`
  align-items: center;
  background-color: #e0e0e0;
  border-radius: 4px;
  box-shadow: 0px -1px -1px rgba(0, 0, 0, 0.35);
  color: #585175;
  font-size: 17px;
  height: 48px;
  padding: 0 10px;
  width: 100%;
`;

export const InputMasked = styled(TextInputMask)`
  align-items: center;
  background-color: #e0e0e0;
  border-radius: 4px;
  box-shadow: 0px -1px -1px rgba(0, 0, 0, 0.35);
  color: #585175;
  font-size: 17px;
  height: 48px;
  padding: 0 10px;
  width: 100%;
`;

export const InputContainer = styled.View`
  width: ${({ row, width }) => {
    const size = width || '47%';
    return row ? size : '100%';
  }};
`;

export const InputTitle = styled.Text`
  color: #585175;
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 10px;
`;

export const StepNumber = styled.Text`
  color: ${({ selected }) => (selected ? '#afaebf' : '#302d46')};
  font-size: ${({ selected }) => (selected ? '54px' : '32px')};
  font-weight: bold;
`;

export const StepText = styled.Text`
  color: #afaebf;
  font-size: 18px;
  font-weight: bold;
`;
