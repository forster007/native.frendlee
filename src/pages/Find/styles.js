import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

export const Avatar = styled.Image`
  border-color: #e1eaf5;
  border-radius: 30px;
  border-width: 2px;
  height: 60px;
  width: 60px;
`;

export const AvatarBlock = styled.View`
  align-items: center;
  height: 80px;
  justify-content: center;
  width: 20%;
`;

export const Card = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  background-color: #ffffff;
  border-color: transparent;
  border-radius: 5px;
  flex-direction: column;
  margin-bottom: 10px;
  width: 100%;
`;

export const CardFooter = styled.View`
  align-items: center;
  flex-direction: row;
  height: 40px;
  padding-horizontal: 10px;
  width: 100%;
`;

export const CardFooterText = styled.Text`
  color: #4c476f;
  font-size: 16px;
  font-weight: bold;
`;

export const CardHeader = styled.View`
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
  height: 80px;
  flex-direction: row;
  padding-left: 5px;
`;

export const Container = styled.View`
  background-color: #dcd9e3;
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
`;

export const Empty = styled.Text`
  color: #999;
  font-size: 15px;
  padding-top: 70px;
  text-align: center;
`;

export const InfoBlock = styled.View`
  justify-content: center;
  height: 80px;
  width: 80%;
`;

export const InfoDataNameShort = styled.Text`
  color: #2a3152;
  font-size: 16px;
`;

export const InfoDataTitleShort = styled.Text.attrs({ numberOfLines: 1 })`
  color: #2a3152;
  font-size: 18px;
  font-weight: bold;
`;

export const ProviderCard = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  background-color: #ffffff;
  border-color: transparent;
  border-radius: 5px;
  flex-direction: column;
  height: ${({ expanded }) => (expanded ? '400px' : '120px')};
  margin-bottom: 10px;
  width: 100%;
`;

export const ProviderCardLong = styled.View``;

export const ProviderCardLongAvatar = styled.ImageBackground.attrs({
  resizeMode: 'cover',
})`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 180px
  justify-content: flex-end;
  overflow: hidden;
  width: 100%;
`;

export const ProviderCardLongBody = styled.View`
  height: 360px;
`;

export const ProviderCardLongFooter = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  height: 40px;
  padding-horizontal: 10px;
  width: 100%;
`;

export const ProviderCardLongFooterText = styled.Text`
  color: #7244d4;
  font-size: 16px;
  font-weight: bold;
`;

export const ProviderCardLongFormation = styled.View`
  align-items: center;
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
  flex-direction: row;
  height: 40px;
  padding-horizontal: 10px;
  width: 100%;
`;

export const ProviderCardLongFormationText = styled.Text`
  color: #4c476f;
  font-size: 18px;
  font-weight: bold;
`;

export const ProviderCardLongFrendleeTop = styled.Image.attrs({
  resizeMode: 'contain',
  source: require('../../../assets/frendlee-provider-top.png'),
})`
  right: 10px;
  height: 48px;
  position: absolute;
  top: -20px;
  width: 38px;
`;

export const ProviderCardLongName = styled.View`
  height: 40px;
  justify-content: center;
  width: 100%;
`;

export const ProviderCardLongNameText = styled.Text`
  color: #ffffff;
  font-size: 22px;
  font-weight: bold;
  padding-left: 10px;
`;

export const ProviderCardLongNote = styled.View`
  align-items: center;
  background-color: #7244d4;
  flex-direction: row;
  height: 40px;
  width: 100%;
`;

export const ProviderCardLongRating = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  padding-horizontal: 10px;
  width: 80px;
`;

export const ProviderCardLongRatingIcon = styled(FontAwesome).attrs({
  color: '#dcd9e3',
  name: 'star',
  size: 24,
})``;

export const ProviderCardLongRatingText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
`;

export const ProviderCardLongService = styled.View`
  align-items: center;
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
  flex-direction: row;
  height: 50px;
  justify-content: space-between;
  padding-horizontal: 10px;
`;

export const ProviderCardLongServices = styled.View`
  height: 100px;
  width: 100%;
`;

export const ProviderCardLongServiceName = styled.View``;

export const ProviderCardLongServiceNameText = styled.Text`
  color: #4c476f;
  font-size: 16px;
`;

export const ProviderCardLongServiceValue = styled.View``;

export const ProviderCardLongServiceValueText = styled.Text`
  color: #2a3152;
  font-size: 16px;
  text-align: center;
`;

export const ProviderCardLongServiceValueTextBold = styled.Text`
  color: #2a3152;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export const ProviderCardLongTreatments = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  width: 80px;
`;

export const ProviderCardLongTreatmentsIcon = styled(FontAwesome).attrs({
  color: '#dcd9e3',
  name: 'user-circle',
  size: 24,
})``;

export const ProviderCardLongTreatmentsText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
`;

export const ProviderCards = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingTop: 15,
  },
})`
  padding-horizontal: 20px;
`;

export const ProviderCardShort = styled.View``;

export const ProviderCardShortAvatar = styled.Image`
  border-color: #e1eaf5;
  border-radius: 30px;
  border-width: 2px;
  height: 60px;
  width: 60px;
`;

export const ProviderCardShortBody = styled.View`
  align-items: center;
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  height: 80px;
  padding-left: 5px;
  width: 100%;
`;

export const ProviderName = styled.Text`
  color: #2a3152;
  font-size: 18px;
  font-weight: bold;
`;

export const ProviderProfile = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const ProviderProfileInfo = styled.View``;

export const ProviderRating = styled.View`
  align-items: center;
  border-left-color: #f2f2f2;
  border-left-width: 1px;
  height: 80px;
  justify-content: center;
  width: 50px;
`;

export const ProviderRatingIcon = styled(FontAwesome).attrs({
  name: 'star',
  size: 26,
})`
  color: #7244d4;
`;

export const ProviderRatingText = styled.Text`
  color: #7244d4;
  font-size: 14px;
  font-weight: bold;
`;

export const ProviderTreatments = styled.Text`
  color: #2a3152;
  font-size: 16px;
`;
