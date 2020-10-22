import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';

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

export const ButtonConnectParent = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  align-items: center;
  background: #7244d4;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  height: 50px;
  justify-content: center;
  margin-bottom: 5px;
  margin-top: 10px;
  width: 100%;
`;

export const ButtonConnectParentText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export const ButtonParentNewRequest = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  align-items: center;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  flex-direction: row;
  height: 25px;
  left: 5px;
  margin-bottom: 5px;
  margin-top: 15px;
  width: 100%;
`;

export const ButtonParentNewRequestBadge = styled.View`
  align-items: center;
  background-color: #ff0000;
  border-radius: 6px;
  height: 12px;
  justify-content: center;
  left: -5px;
  position: absolute;
  top: -5px;
  width: 12px;
  z-index: 10;
`;

export const ButtonParentNewRequestBadgeText = styled.Text`
  color: #ffffff;
  font-size: 8px;
`;

export const ButtonParentNewRequestIcon = styled.Image.attrs({
  resizeMode: 'contain',
  source: require('../../../assets/frendlee-icon-parent-request.png'),
})`
  height: 30px;
  width: 30px;
`;

export const ButtonParentNewRequestText = styled.Text`
  color: #7244d4;
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
  text-align: center;
`;

export const ButtonShareParent = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  align-items: flex-start;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  height: 25px;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
  margin-bottom: 10px;
`;

export const ButtonShareParentText = styled.Text`
  color: #7244d4;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export const Div = styled.View`
  padding-horizontal: 10px;
  background: #DCD9E3;
`;

export const Divisor = styled.View`
  background-color: #f2f2f2;
  height: 1px;
  margin-bottom: 5px;
  margin-top: 10px;
  width: 100%;
`;

export const DivisorInfo = styled.View`
  background-color: #CFCED8;
  height: 1px;
  margin-bottom: 10px;
  margin-top: 10px;
  width: 100%;
`;
export const Input = styled.TextInput`
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 4px;
  color: #585175;
  font-size: 30px;
  height: 48px;
  padding: 0 10px;
  width: 100%;
`;

export const Label = styled.Text`
  color: #585175;
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 10px;
`;

export const ProfileAvatar = styled.ImageBackground.attrs({
  resizeMode: 'cover',
})`
  height: 240px
  justify-content: flex-end;
  overflow: hidden;
  width: 100%;
`;

export const ProfileName = styled.View`
  padding-vertical: 10px;
  width: 100%;
`;

export const ProfileNameText = styled.Text`
  color: #ffffff;
  font-size: 26px;
  font-weight: bold;
  padding-left: 10px;
`;

export const ProfileCardBiography = styled.View`
  color: #2A3152;
  width: 100%;
  margin-bottom: 10px;
`;

export const ProfileCardBiographyTitle = styled.Text`
  color: #2A3152;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
`;

export const ProfileCardBiographyText = styled.Text.attrs({
  numberOfLines: 7,
})`
  color: #2A3152;
  font-size: 16px;
  line-height: 22.5px;
`;

export const ProfileCardInformation = styled.View`
  align-items: center;
  flex-direction: row;
  width: 100%;
  border: 2px solid #E9E5EE;
  border-radius: 5px;
  height: 50px;
  margin-top: 10px;
`;

export const ProfileCardInformationText = styled.Text`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  color: #2A3152;
  font-size: 18px;
  font-weight: bold;
  line-height: 21px;
  padding: 10px;
`;

export const ProfileCardInformationSsnIcon = styled(FontAwesome).attrs({
  color: '#4C476F',
  name: 'id-card-o',
  size: 26
})`
  text-align: center;
  padding: 0 10px;
  width: 50px;
`;

export const ProfileCardInformationEmailIcon = styled(FontAwesome).attrs({
  color: '#4C476F',
  name: 'envelope-o',
  size: 27
})`
  text-align: center;
  padding: 0 10px;
  width: 50px;
`;

export const ProfileCardInfoText = styled.Text`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  color: #2A3152;
  font-size: 18px;
  font-weight: bold;
  line-height: 21px;
  padding: 10px;
`;

export const ProfileCardInfo = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  margin-top: 10px;
  width: 100%;
`;

export const ProfileCardInfoAge = styled.View`
  align-items: center;
  border: 2px solid #E9E5EE;
  border-radius: 5px;
  height: 50px;
  flex-direction: row;
  justify-content: center;
  width: 48%;
`;

export const ProfileCardInfoAgeIcon = styled.Image.attrs({
  resizeMode: 'contain',
  source: require('../../../assets/frendlee-provider-cake.png'),
})`
  height: 25px;
  margin-right: 10px;
  width: 25px;
`;

export const ProfileCardInfoAgeText = styled.Text`
  color: #4c476f;
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
`;

export const ProfileCardInfoGender = styled.View`
  align-items: center;
  border: 2px solid #E9E5EE;
  border-radius: 5px;
  height: 50px;
  flex-direction: row;
  justify-content: center;
  width: 48%;
`;

export const ProfileCardInfoGenderIconFemale = styled.Image.attrs(props => ({
  resizeMode: 'contain',
  source: require(`../../../assets/frendlee-gender-female.png`),
  // source: require(`../../../assets/${props => props.gender === 'female' ? 'frendlee-gender-female.png' : 'frendlee-provider-male.png'}`),
}))`
  height: 25px;
  margin-right: 10px;
  width: 25px;
`;

export const ProfileCardInfoGenderIconMale = styled.Image.attrs({
  resizeMode: 'contain',
  source: require(`../../../assets/frendlee-provider-male.png`),
})`
  height: 25px;
  margin-right: 10px;
  width: 25px;
`;

export const ProfileCardInfoGenderText = styled.Text`
  color: #4c476f;
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
`;

export const ProfileCardInfoPhone = styled.View`
  align-items: center;
  border: 2px solid #E9E5EE;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  height: 50px;
  flex-direction: row;
  width: 65%;
`;

export const ProfileCardInfoPhoneIcon = styled(FontAwesome).attrs({
  color: '#4C476F',
  name: 'phone',
  size: 26
})`
text-align: center;
padding: 0 10px;
width: 50px;
`;

export const ProfileCardInfoPhoneText = styled.Text`
  color: #4c476f;
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
`;

export const ProfileCardInfoWhatsapp = styled.View`
  align-items: center;
  border: 2px solid #E9E5EE;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  height: 50px;
  flex-direction: row;
  width: 35%;
  background: #E9E5EE;
`;

export const ProfileCardInfoWhatsappIcon = styled(FontAwesome).attrs({
  color: '#4C476F',
  name: 'whatsapp',
  size: 22
})`
  text-align: center;
  width: 40px;
`;

export const ProfileCardInfoWhatsappText = styled.Text`
  color: #4c476f;
  font-size: 15px;
  font-weight: bold;
`;

export const ProfileCardInfoMedical = styled.View`
  color: #2A3152;
  width: 100%;
  margin: 20px 0;
`;

export const ProfileCardInfoMedicalTitle = styled.Text`
  color: #2A3152;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
`;

export const ProfileCardInfoMedicalItem = styled.View`
  align-items: center;
  border-radius: 2px;
  height: 50px;
  flex-direction: row;
  flex: 1;
  background: rgba(175, 174, 191, 0.5);
  margin-top: 10px;
`;

export const ProfileCardInfoMedicalItemIcon = styled.Image.attrs({
  resizeMode: 'contain',
  source: require('../../../assets/frendlee-profile-medical.png'),
})`
  height: 25px;
  margin: 10px;
  width: 25px;
`;

export const ProfileCardInfoMedicalItemText = styled.Text`
  color: #2A3152;
  font-size: 18px;
  font-weight: bold;
`;

export const ProfileCardInfoMedicalFlatList = styled.FlatList``;
