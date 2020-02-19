import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

const stuffs = [
  '',
  require('../../../assets/frendlee-stuff-1.png'),
  require('../../../assets/frendlee-stuff-2.png'),
  require('../../../assets/frendlee-stuff-3.png'),
  require('../../../assets/frendlee-stuff-4.png'),
];

export const Block = styled.View`
  margin-horizontal: 20px;
`;

export const Container = styled.View`
  background-color: #dcd9e3;
  flex: 1;
`;

export const Content = styled.ScrollView.attrs({
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
  font-size: 17px;
  height: ${({ multiline }) => (multiline ? '100px' : '48px')};
  margin-top: 10px;
  padding: ${({ multiline }) => (multiline ? '10px' : '0')} 10px;
  text-align-vertical: ${({ multiline }) => (multiline ? 'top' : 'center')};
  width: 100%;
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
  padding-vertical: 10px;
  width: 100%;
`;

export const ProviderCardBiographyText = styled.Text.attrs({
  numberOfLines: 4,
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

export const ProviderCardServicesDescription2 = styled.View`
  padding-vertical: 10px;
  height: 200px;
  position: relative;
  flex: 1;
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
