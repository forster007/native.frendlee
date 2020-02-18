import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

export const Container = styled.View`
  background-color: #dcd9e3;
  flex: 1;
`;

export const Content = styled.View`
  background-color: #ffffff;
  flex: 1;
  padding-horizontal: 20px;
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
  align-items: center;
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
  flex-direction: row;
  padding-vertical: 15px;
  width: 100%;
`;

export const ProviderCardBiographyText = styled.Text.attrs({
  numberOfLines: 4,
})`
  color: #4c476f;
  font-size: 18px;
  line-height: 20px;
`;

export const ProviderCardFormation = styled.View`
  align-items: center;
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
  flex-direction: row;
  height: 40px;
  width: 100%;
`;

export const ProviderCardFormationText = styled.Text`
  color: #4c476f;
  font-size: 18px;
  font-weight: bold;
`;

export const ProviderCardFrendleeTop = styled.Image.attrs({
  resizeMode: 'contain',
  source: require('../../../assets/frendlee-top.png'),
})`
  right: 10px;
  height: 48px;
  position: absolute;
  top: -20px;
  width: 38px;
`;

export const ProviderCardInfo = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: 80px;
  width: 100%;
`;

export const ProviderCardInfoAge = styled.View`
  align-items: center;
  border: 2px solid #f2f2f2;
  border-radius: 2px;
  height: 50px;
  justify-content: center;
  width: 48%;
`;

export const ProviderCardInfoAgeIcon = styled.View``;

export const ProviderCardInfoAgeText = styled.Text`
  color: #4c476f;
  font-size: 18px;
  font-weight: bold;
`;

export const ProviderCardInfoGender = styled.View`
  align-items: center;
  border: 2px solid #f2f2f2;
  border-radius: 2px;
  height: 50px;
  justify-content: center;
  width: 48%;
`;

export const ProviderCardInfoGenderIcon = styled.View``;

export const ProviderCardInfoGenderText = styled.Text`
  color: #4c476f;
  font-size: 18px;
  font-weight: bold;
`;

export const ProviderCardName = styled.View`
  height: 40px;
  justify-content: center;
  width: 100%;
`;

export const ProviderCardNameText = styled.Text`
  color: #ffffff;
  font-size: 22px;
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
