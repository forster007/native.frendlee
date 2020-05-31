import styled from 'styled-components/native';

export const Card = styled.View`
  background-color: #ffffff;
`;

export const CardAction = styled.View`
  flex-direction: row;
  justify-content: ${({ size }) => (size ? 'center' : 'space-between')};
  margin-top: ${({ size }) => (size ? '10px' : '0px')};
  padding: 10px;
  width: 100%;
`;

export const CardActionButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  align-items: center;
  background-color: ${({ color }) => color || '#906dda'};
  border-radius: 4px;
  elevation: 5;
  height: 55px;
  justify-content: center;
  width: ${({ size }) => size || '#49%'};
`;

export const CardActionButtonText = styled.Text`
  align-items: center;
  color: #ffffff;
  font-weight: bold;
  font-size: 18px;
  font-style: normal;
  text-align: center;
`;

export const CardBody = styled.View`
  padding-horizontal: 20px;
`;

export const CardBodyItem = styled.View`
  align-items: center;
  flex-direction: row;
  padding-vertical: 10px;
`;

export const CardBodyItemData = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
`;

export const CardBodyItemDivisor = styled.View`
  background-color: #f2f2f2;
  height: 1px;
  width: 100%;
`;

export const CardBodyItemIcon = styled.View`
  width: 10%;
`;

export const CardBodyItemText = styled.Text.attrs(props => ({
  numberOfLines: props.short ? 1 : 5,
}))`
  color: #2a3152;
  font-size: 16px;
  font-weight: 400;
  text-align: justify;
`;

export const CardCompliment = styled.View`
  align-items: center;
  align-self: center;
  background-color: #302d46;
  border-radius: 5px;
  padding: 10px;
`;

export const CardComplimentIcon = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  align-items: center;
  background-color: ${({ selected }) => (selected ? '#8C5FEE' : '#302d46')};
  border-radius: 5px;
  height: 120px;
  justify-content: center;
  margin: 10px;
  padding-top: 10px;
  width: 40%;
`;

export const CardComplimentRow = styled.View`
  flex-direction: row;
`;

export const CardComplimentText = styled.Text`
  color: ${({ selected }) => (selected ? '#ffffff' : '#8c5fee')};
  align-items: center;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  margin-top: 10px;
  text-align: center;
`;

export const CardComplimentTitle = styled.View`
  width: 80%;
`;

export const CardComplimentTitleText = styled.Text`
  align-items: center;
  color: #ffffff;
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  margin-vertical: 10px;
  text-align: center;
`;

export const CardFooter = styled.View`
  align-items: center;
  background-color: ${({ color }) => color || '#4c476f'};
  flex-direction: row;
  height: 55px;
  justify-content: space-between;
  padding-horizontal: 20px;
  width: 100%;
`;

export const CardFooterText = styled.Text`
  align-items: center;
  color: #ffffff;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  text-align: right;
`;

export const CardHeader = styled.View`
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
  padding: 20px;
`;

export const CardHeaderSubText = styled.Text`
  color: #2a3152;
  line-height: 28px;
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  padding-top: 10px;
`;

export const CardHeaderText = styled.Text`
  color: #2a3152;
  line-height: 28px;
  font-size: 20px;
  font-style: normal;
  font-weight: bold;
`;

export const CardRating = styled.View`
  align-items: center;
  flex-direction: row;
  height: 80px;
  justify-content: center;
`;

export const CardRatingStars = styled.View`
  align-items: center;
  justify-content: center;
`;

export const CardRatingText = styled.Text`
  align-items: center;
  color: #2a3152;
  font-size: 32px;
  font-style: normal;
  font-weight: bold;
  padding-right: 10px;
  text-align: right;
  top: 2px;
`;

export const Container = styled.View`
  background-color: #dcd9e3;
  flex: 1;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 20,
  },
})`
  background-color: #fff;
  flex: 1;
`;

export const IconAddress = styled.Image.attrs({
  resizeMode: 'contain',
  source: require('../../../assets/frendlee-customer-nav.png'),
})`
  height: 20px;
  width: 20px;
`;

export const IconClock = styled.Image.attrs({
  resizeMode: 'contain',
  source: require('../../../assets/frendlee-customer-clock.png'),
})`
  height: 20px;
  width: 20px;
`;

export const IconHourglass = styled.Image.attrs({
  resizeMode: 'contain',
  source: require('../../../assets/frendlee-icon-hourglass.png'),
})`
  tint-color: ${({ color }) => color || '#16b8dc'};
  height: 25px;
  width: 25px;
`;

export const IconImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  tint-color: ${({ selected }) => (selected ? '#ffffff' : '#8c5fee')};
  height: 50px;
  width: 50px;
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

export const InputLegend = styled.Text`
  color: rgba(76, 71, 111, 0.5);
  font-size: 14px;
  padding-vertical: 10px;
`;

export const ProviderAvatar = styled.ImageBackground.attrs({
  resizeMode: 'cover',
})`
  height: 240px
  justify-content: flex-end;
  overflow: hidden;
  width: 100%;
`;

export const ProviderName = styled.View`
  padding-vertical: 10px;
  width: 100%;
`;

export const ProviderNameText = styled.Text`
  color: #ffffff;
  font-size: 26px;
  font-weight: bold;
  padding-left: 10px;
`;
