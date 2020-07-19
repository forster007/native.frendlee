import React from 'react';
import { Platform } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CheckBox } from 'react-native-elements';

const colors = ['#2F80ED', '#FF8000'];

const stuffs = [
  '',
  require('../../../assets/frendlee-stuff-1.png'),
  require('../../../assets/frendlee-stuff-2.png'),
  require('../../../assets/frendlee-stuff-3.png'),
  require('../../../assets/frendlee-stuff-4.png'),
];

export const Block = styled.View`
  margin-horizontal: 20px;
  padding-bottom: ${Platform.OS === 'ios' ? '15px' : '0px'};
`;

export const Container = styled.View`
  background-color: #dcd9e3;
  flex: 1;
`;

export const Content = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'always',
  nestedScrollEnabled: true,
  showsVerticalScrollIndicator: false,
})`
  background-color: #ffffff;
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
`;

export const Input = styled.TextInput`
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 4px;
  box-shadow: 0px -1px -1px rgba(0, 0, 0, 0.35);
  color: #585175;
  elevation: 1;
  font-size: 17px;
  height: ${({ multiline }) => (multiline ? '100px' : '48px')};
  margin-top: 10px;
  padding: ${({ multiline }) => (multiline ? '10px' : '0')} 10px;
  text-align-vertical: ${({ multiline }) => (multiline ? 'top' : 'center')};
  width: 100%;
`;

export const Input2 = styled.TextInput`
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 4px;
  box-shadow: 0px -1px -1px rgba(0, 0, 0, 0.35);
  color: #585175;
  elevation: 1;
  font-size: 17px;
  height: 48px;
  margin-top: 10px;
  padding-left: 10px;
  text-align-vertical: center;
  width: 60%;
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
  minDate: Moment()
    .add(1, 'day')
    .format('YYYY-MM-DD HH:mm'),
  mode: 'datetime',
  placeholder: ' ',
  touchableOpacity: 0,
}))`
  align-items: center;
  background-color: #f2f2f2;
  border-width: 0px;
  border-radius: 4px;
  box-shadow: 0px -1px -1px rgba(0, 0, 0, 0.35);
  elevation: 1;
  height: 48px;
  padding: 0 10px;
  margin-bottom: 20px;
  margin-top: 10px;
  width: 60%;
`;

export const InputGooglePlaces = styled(GooglePlacesAutocomplete).attrs(
  props => ({
    autoFocus: false,
    debounce: 500,
    enablePoweredByContainer: false,
    minLength: 2,
    nearbyPlacesAPI: 'GooglePlacesSearch',
    nestedScrollEnabled: true,
    placeholder: '',
    returnKeyType: 'search',
    query: {
      key: 'AIzaSyAFJIPPAEdmSCSFw9BxBR3HHJH8youwCic',
      language: 'pt',
      location: props.location,
      radius: 1000,
    },
    styles: {
      container: {
        marginTop: 4,
      },
      row: {
        backgroundColor: '#f2f2f2',
        paddingLeft: 5,
      },
      textInput: {
        backgroundColor: props.editable ? '#f2f2f2' : '#e0e0e0',
        borderRadius: 4,
        shadowColor: 'rgba(0, 0, 0, 0.35)',
        shadowOffset: {
          height: -1,
        },
        shadowOpacity: 1,
        shadowRadius: 0.5,
        elevation: 1,
        color: '#585175',
        fontSize: 17,
        height: 48,
        marginLeft: 0,
        marginRight: 0,
      },
      textInputContainer: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        borderTopWidth: 0,
        margin: 0,
        marginBottom: 10,
        padding: 0,
        width: '100%',
      },
    },
  })
)``;

export const ParentAvatar = styled.Image`
  border-color: ${({ color }) => colors[color] || colors[0]};
  border-radius: 20px;
  border-width: 2px;
  height: 40px;
  left: -2px;
  width: 12%;
`;

export const ParentBlock = styled.View`
  border-top-color: #f2f2f2;
  border-top-width: 1px;
  margin-bottom: 15px;
  padding-top: 10px;
`;

export const ParentCheckBox = styled(CheckBox).attrs(() => ({
  checkedColor: '#302d46',
  checkedIcon: 'square',
  containerStyle: {
    alignItems: 'flex-end',
    height: 35,
    justifyContent: 'center',
    margin: 0,
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
    paddingLeft: 0,
    paddingRight: 0,
    top: 1,
    width: 35,
  },
  size: 30,
}))``;

export const ParentNameText = styled.Text`
  color: ${({ color }) => colors[color] || colors[0]};
  font-size: 16px;
  font-weight: bold;
  padding-horizontal: 10px;
`;

export const ParentOption = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  align-items: center;
  background-color: #fff;
  border-color: ${({ color }) => colors[color] || colors[0]};
  border-radius: 25px;
  border-width: 2px;
  flex-direction: row;
  height: 50px;
  padding: 5px;
  margin-right: 10px;
  margin-top: 15px;
`;

export const ParentSelection = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 85%;
`;

export const ProviderCardAvatar = styled.ImageBackground.attrs({
  resizeMode: 'cover',
})`
  height: 240px
  justify-content: flex-end;
  overflow: hidden;
  width: 100%;
`;

export const ProviderCardBiography = styled.View`
  width: 100%;
`;

export const ProviderCardBiographyText = styled.Text.attrs({
  numberOfLines: 5,
})`
  color: #4c476f;
  font-size: 18px;
  line-height: 20px;
`;

export const ProviderCardClock = styled.View`
  align-items: center;
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
  flex-direction: row;
  padding-vertical: 12px;
  width: 100%;
`;

export const ProviderCardClockIcon = styled.Image.attrs({
  resizMode: 'contain',
  source: require('../../../assets/frendlee-provider-calendar.png'),
})`
  height: 32px;
  width: 32px;
`;

export const ProviderCardClockInfo = styled.View`
  margin-left: 16px;
`;

export const ProviderCardClockInfoPeriodText = styled.Text`
  color: #4c476f;
  font-size: 16px;
`;

export const ProviderCardClockInfoText = styled.Text`
  color: #4c476f;
  font-size: 14px;
  font-weight: bold;
`;

export const ProviderCardDateTimeDuration = styled.View`
  padding-bottom: 20px;
  padding-top: 10px;
`;

export const ProviderCardFormation = styled.View`
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
  padding-vertical: 10px;
  width: 100%;
`;

export const ProviderCardFormationText = styled.Text`
  color: #4c476f;
  font-size: 18px;
  font-weight: bold;
`;

export const ProviderCardFrendleeTop = styled.Image.attrs({
  resizeMode: 'contain',
  source: require('../../../assets/frendlee-provider-top.png'),
})`
  right: 10px;
  height: 58px;
  position: absolute;
  top: -22px;
  width: 48px;
`;

export const ProviderCardInfo = styled.View`
  align-items: center;
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 14px;
  width: 100%;
`;

export const ProviderCardInfoAge = styled.View`
  align-items: center;
  border: 1px solid #f2f2f2;
  border-radius: 5px;
  height: 50px;
  flex-direction: row;
  justify-content: center;
  width: 48%;
`;

export const ProviderCardInfoAgeIcon = styled.Image.attrs({
  resizeMode: 'contain',
  source: require('../../../assets/frendlee-provider-cake.png'),
})`
  height: 25px;
  margin-right: 10px;
  width: 25px;
`;

export const ProviderCardInfoAgeText = styled.Text`
  color: #4c476f;
  font-size: 18px;
  font-weight: bold;
`;

export const ProviderCardInfoGender = styled.View`
  align-items: center;
  border: 1px solid #f2f2f2;
  border-radius: 5px;
  height: 50px;
  flex-direction: row;
  justify-content: center;
  width: 48%;
`;

export const ProviderCardInfoGenderIcon = styled.Image.attrs({
  resizeMode: 'contain',
  source: require('../../../assets/frendlee-provider-male.png'),
})`
  height: 25px;
  margin-right: 10px;
  width: 25px;
`;

export const ProviderCardInfoGenderText = styled.Text`
  color: #4c476f;
  font-size: 18px;
  font-weight: bold;
`;

export const ProviderCardName = styled.View`
  padding-vertical: 10px;
  width: 100%;
`;

export const ProviderCardNameText = styled.Text`
  color: #ffffff;
  font-size: 26px;
  font-weight: bold;
  padding-left: 10px;
`;

export const ProviderCardNote = styled.View`
  align-items: center;
  background-color: #7244d4;
  flex-direction: row;
  height: 50px;
  width: 100%;
`;

export const ProviderCardRating = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  padding-horizontal: 10px;
  width: 80px;
`;

export const ProviderCardRatingIcon = styled(FontAwesome).attrs({
  color: '#dcd9e3',
  name: 'star',
  size: 26,
})``;

export const ProviderCardRatingText = styled.Text`
  color: #ffffff;
  font-size: 26px;
  font-weight: 500;
`;

export const ProviderCardStuff = styled.Image.attrs(({ id }) => ({
  resizeMode: 'contain',
  source: stuffs[id],
}))`
  margin-right: ${({ last }) => (last ? '0px' : '8px')};
  height: 30px;
  width: 140px;
`;

export const ProviderCardStuffs = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  flex: 1;
  flex-direction: row;
  overflow: visible;
  padding-vertical: 15px;
`;

export const ProviderCardServices = styled.View`
  padding-top: 10px;
`;

export const ProviderCardServicesDescription = styled.View`
  padding-vertical: 10px;
`;

export const ProviderCardServicesSubTitleText = styled.Text`
  color: rgba(76, 71, 111, 0.5);
  font-size: 14px;
  padding-vertical: 10px;
`;

export const ProviderCardServicesTitleText = styled.Text`
  color: #4c476f;
  font-size: 18px;
  font-weight: bold;
`;

export const ProviderCardServicesOptions = styled.View`
  width: 100%;
`;

export const ProviderCardServicesOption = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  background-color: ${({ selected }) => (selected ? '#7244d4' : '#fff')}
  border: 2px solid #7244d4;
  border-radius: 5px;
  flex-direction: row;
  margin-top: 10px;
  padding-horizontal: 10px;
  width: 100%;
`;

export const ProviderCardServicesOptionText = styled.Text`
  color: ${({ selected }) => (selected ? '#fff' : '#7244d4')}
  font-size: 16px;
  font-weight: bold;
`;

export const ProviderCardServicesOptionTextBlock = styled.View`
  height: 40px;
  justify-content: center;
  width: 85%;
`;

export const ProviderCardServicesOptionValue = styled.Text`
  color: ${({ selected }) => (selected ? '#fff' : '#4c476f')}
  font-size: 16px;
  font-weight: bold;
`;

export const ProviderCardServicesOptionValueBlock = styled.View`
  align-items: flex-end;
  border-left-color: ${({ selected }) =>
    selected ? 'rgba(0, 0, 0, 0.1)' : '#7244d4'}
  border-left-width: 2px;
  justify-content: center;
  width: 15%;
`;

export const ProviderCardSubmit = styled.View`
  border-top-color: #f2f2f2;
  border-top-width: 1px;
  padding-vertical: 20px;
  width: 100%;
`;

export const ProviderCardSubmitButton = styled.TouchableOpacity.attrs(
  props => ({
    activeOpacity: 0.7,
    disabled: !props.state,
  })
)`
  align-items: center;
  background-color: ${props => (props.state ? '#7244d4' : '#cdcdcd')};
  border-radius: 4px;
  height: 42px;
  justify-content: center;
  width: 100%;
`;

export const ProviderCardSubmitButtonText = styled.Text`
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
`;

export const ProviderCardTreatments = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  width: 80px;
`;

export const ProviderCardTreatmentsIcon = styled(FontAwesome).attrs({
  color: '#dcd9e3',
  name: 'user-circle',
  size: 26,
})``;

export const ProviderCardTreatmentsText = styled.Text`
  color: #ffffff;
  font-size: 26px;
  font-weight: 500;
`;

export const TermsCheckBox = styled(CheckBox).attrs(() => ({
  checkedColor: '#302d46',
  checkedIcon: 'check-square-o',
  containerStyle: {
    marginLeft: 0,
    padding: 0,
    paddingLeft: 0,
  },
  size: 25,
}))``;
