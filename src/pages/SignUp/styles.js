import React from 'react';
import { Dimensions, Platform } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import { CheckBox } from 'react-native-elements';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';

const { height } = Dimensions.get('window');

export const BlockBody = styled.View`
  padding: 0 20px;
`;

export const BlockFooter = styled.View`
  background-color: #4c476f;
  flex-direction: row;
  height: ${Platform.OS === 'ios' && height >= 812 ? '150px' : '130px'};
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
`;

export const BlockHeader = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${Platform.OS === 'android' ? '20px 20px 0px' : '0px 20px'};
`;

export const BodyRow = styled.View`
  align-items: ${({ center }) => (center ? 'center' : 'stretch')};
  justify-content: ${({ row }) => (row ? 'space-between' : 'flex-start')};
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
  padding: 10px 0;
`;

export const BodyText = styled.Text`
  color: ${({ color }) => color || '#585175'};
  font-size: 16px;
  font-weight: ${({ weight }) => weight || 'normal'};
  text-decoration-line: ${({ decoration }) => decoration || 'none'};
`;

export const BodyTitle = styled.Text`
  color: #302d46;
  font-size: 30px;
  margin-bottom: 15px;
`;

export const Button = styled(RectButton)`
  align-items: center;
  background-color: ${({ selected }) => (selected ? '#4c476f' : 'transparent')};
  border: ${({ selected }) => (selected ? '2px solid #4c476f' : 'transparent')};
  border-radius: 4px;
  height: 40px;
  justify-content: center;
  padding: 2px;
  width: 99%;
`;

export const ButtonContainer = styled.View`
  align-items: center;
  background-color: #cfcedf;
  border: 2px solid #afaebf;
  border-radius: 4px;
  flex-direction: ${({ direction }) => direction || 'column'};
  height: 48px;
  justify-content: center;
  margin: 0px 0px 15px;
  width: 100%;
`;

export const ButtonGroup = styled.View`
  align-items: center;
  background-color: #cfcedf;
  border: 2px solid #afaebf;
  border-radius: 4px;
  flex-direction: row;
  height: 48px;
  justify-content: space-between;
  padding: 0px 2px;
`;

export const ButtonGroupOption = styled(RectButton)`
align-items: center;
background-color: ${({ selected }) => (selected ? '#4c476f' : 'transparent')}
border-radius: 4px;
height: 40px;
justify-content: center;
width: 30%;
`;

export const ButtonGroupText = styled.Text`
  color: ${({ selected }) => (selected ? '#ffffff' : '#7244d4')};
  font-size: 14px;
  font-weight: bold;
`;

export const ButtonInput = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  right: 35px;
`;

export const ButtonNext = styled(RectButton).attrs(props => ({
  enabled: !!props.state,
}))`
  align-items: center;
  background-color: ${props => (props.state ? '#7244d4' : '#cdcdcd')};
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

export const ButtonSignUpFacebook = styled(RectButton)`
  align-items: center;
  background-color: #3b5998;
  border-radius: 4px;
  flex-direction: row;
  height: 42px;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 20px 0 20px;
  width: 100%;
`;

export const ButtonSignUpFacebookIcon = styled(FontAwesome).attrs({
  color: '#ffffff',
  name: 'facebook',
  size: 20,
})``;

export const ButtonSignUpFacebookText = styled.Text`
  color: #ffffff;
  font-size: 20px;
`;

export const ButtonText = styled.Text`
  color: ${({ selected }) => (selected ? '#ffffff' : '#7244d4')};
  font-size: 16px;
  font-weight: bold;
`;

export const Container = styled.View`
  flex: 1;
  padding-top: ${Platform.OS === 'ios' && height >= 812
    ? '50px'
    : Platform.OS === 'android'
    ? '0px'
    : '30px'};
`;

export const Content = styled.ScrollView.attrs(({ justify }) => ({
  bounces: false,
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: justify || 'space-between',
  },
  showsVerticalScrollIndicator: false,
}))``;

export const Div = styled.View`
  align-items: ${({ align }) => align || 'stretch'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  flex-direction: ${({ direction }) => direction || 'column'};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? '15px' : '0px')};
  width: ${({ width }) => width || '100%'};
`;

export const Divisor = styled.View`
  background-color: #cfc3d8;
  height: 1px;
  margin: 30px 0 20px;
  padding: 0 20px;
  width: 100%;
`;

export const FooterStep = styled.View`
  align-items: center;
  border-top-color: ${({ selected }) => (selected ? '#e0e0e0' : '#302d46')};
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

export const FrendleeProfilePicture = styled.Image.attrs(props => {
  return {
    resizeMode: 'contain',
    source:
      props.source && props.source.uri
        ? props.source
        : require('../../../assets/frendlee-profile-picture.png'),
  };
})`
  ${props => (props.source && props.source.uri ? 'border-radius: 4px;' : '')}
  height: 50px;
  padding-right: 20px;
  width: 50px;
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
  width: 48%;
`;

export const GenderImage = styled.Image.attrs(({ gender }) => {
  switch (gender) {
    case 'female':
      return {
        resizeMode: 'contain',
        source: require(`../../../assets/frendlee-gender-female.png`),
      };
    case 'male':
      return {
        resizeMode: 'contain',
        source: require(`../../../assets/frendlee-gender-male.png`),
      };

    case 'parent-1':
      return {
        resizeMode: 'contain',
        source: require(`../../../assets/frendlee-gender-group-parent-1.png`),
      };

    case 'parent-2':
      return {
        resizeMode: 'contain',
        source: require(`../../../assets/frendlee-gender-group-parent-2.png`),
      };

    case 'user-1':
      return {
        resizeMode: 'contain',
        source: require(`../../../assets/frendlee-gender-group-user-1.png`),
      };

    case 'user-2':
      return {
        resizeMode: 'contain',
        source: require(`../../../assets/frendlee-gender-group-user-2.png`),
      };

    default:
      return {};
  }
})`
  height: 65px;
  width: 65px;
`;

export const GenderText = styled.Text`
  color: ${({ genderSelected }) => (genderSelected ? '#e0e0e0' : '#7244D4')};
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0 0 0;
`;

export const HeaderLogo = styled.Image.attrs({
  resizeMode: 'contain',
  source: require('../../../assets/frendlee-logo.png'),
})`
  height: 40px;
  width: 160px;
`;

export const HeaderSubTitle = styled.Text`
  color: #4c476f;
  font-size: 18px;
  padding: 20px 0 0;
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
  background-color: ${({ disabled }) => (disabled ? '#a9a9a9' : '#e0e0e0')};
  border-radius: 4px;
  box-shadow: 0px -1px -1px rgba(0, 0, 0, 0.35);
  color: #585175;
  font-size: 17px;
  height: 48px;
  padding: 0 10px;
  width: 100%;
`;

export const InputDatePicker = styled(DatePicker).attrs(props => ({
  activeOpacity: 0,
  cancelBtnText: 'Cancel',
  confirmBtnText: 'Select',
  customStyles: {
    dateInput: {
      alignItems: 'flex-start',
      borderWidth: 0,
      fontSize: 14,
      top: 3,
    },
    dateText: {
      color: '#585175',
      fontSize: 17,
    },
  },
  iconComponent: (
    <FontAwesome
      color={props.date ? '#7244D4' : '#afafaf'}
      name="calendar"
      size={24}
      style={{ top: 3 }}
    />
  ),
  maxDate: Moment()
    .subtract(18, 'years')
    .format('YYYY-MM-DD'),
  mode: 'date',
  placeholder: ' ',
  touchableOpacity: 0,
}))`
  align-items: center;
  background-color: #e0e0e0;
  border-width: 0px;
  border-radius: 4px;
  box-shadow: 0px -1px -1px rgba(0, 0, 0, 0.35);
  color: #585175;
  font-size: 17px;
  height: 48px;
  padding: 0 10px;
  width: 100%;
`;

export const InputIcon = styled(FontAwesome).attrs(
  ({ color, icon, size, visible }) => ({
    color: color || '#7244d4',
    name: icon || (visible ? 'eye' : 'eye-slash'),
    size: size || 24,
  })
)``;

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

export const InputTitle = styled.Text`
  color: #585175;
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 10px;
`;

export const StepNumber = styled.Text`
  color: ${({ selected }) => (selected ? '#e0e0e0' : '#302d46')};
  font-size: ${({ selected }) => (selected ? '54px' : '32px')};
  font-weight: bold;
`;

export const StepText = styled.Text`
  color: #e0e0e0;
  font-size: 18px;
  font-weight: bold;
`;

export const TermsCheckBox = styled(CheckBox).attrs(() => ({
  checkedColor: '#302d46',
  checkedIcon: 'square',
  containerStyle: {
    marginLeft: 0,
    padding: 0,
    paddingLeft: 0,
  },
  size: 34,
}))``;
