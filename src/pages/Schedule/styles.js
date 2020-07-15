import styled from 'styled-components/native';

const colors = ['#2F80ED', '#FF8000'];

export const ActionButton = styled.TouchableOpacity`
  background-color: transparent;
  height: 50px;
  justify-content: center;
  padding-vertical: 10px;
`;

export const ActionButtonText = styled.Text`
  color: #1ec5ea;
  font-size: 20px;
  font-weight: bold;
`;

export const ValueBlock = styled.View`
  background-color: #ff0;
  height: 80px;
  width: 33%;
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

export const Appointments = styled.FlatList.attrs({
  contentContainerStyle: { paddingTop: 10 },
})`
  padding-horizontal: 10px;
`;

export const Card = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  background-color: #ffffff;
  border-color: transparent;
  border-radius: 5px;
  flex-direction: column;
  margin-bottom: 30px;
  width: 100%;
`;

export const CardActionFooter = styled.View`
  align-items: center;
  border-top-color: #f2f2f2;
  border-top-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 20px;
  width: 100%;
`;

export const CardBodyItem = styled.View`
  height: 50px;
  justify-content: center;
`;

export const CardBodyItemInfoText = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 14px;
  margin-left: 10px;
`;

export const CardFooter = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  align-items: center;
  background-color: ${({ status }) =>
    status === 'canceled' || status === 'finished' ? '#bdbdbd' : '#2a3152'};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 50px;
  justify-content: center;
`;

export const CardFooterText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const Profile = styled.View`
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
  flex-direction: row;
  height: 80px;
  width: 100%;
`;

export const AvatarInfo = styled.View`
  width: 20%;
`;

export const Divisor = styled.View`
  background-color: #f2f2f2;
  height: 1px;
  width: 100%;
`;

export const ItemAddress = styled.View`
  height: 50px;
  justify-content: center;
`;

export const ShortItemInfo = styled.View`
  align-items: center;
  flex-direction: row;
  width: 60%;
`;

export const ShortProfileName = styled.Text`
  color: #2a3152;
  font-size: 16px;
`;

export const ShortProfileTitle = styled.Text.attrs({ numberOfLines: 1 })`
  color: #2a3152;
  font-size: 20px;
  font-weight: bold;
`;

export const LongItemInfo = styled.View`
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

export const LongProfileName = styled.Text`
  color: #1ec5ea;
  font-size: 16px;
`;

export const LongProfileTitle = styled.Text.attrs({ numberOfLines: 2 })`
  color: #2a3152;
  font-size: 20px;
  font-weight: bold;
`;

export const RequestCoin = styled.Text`
  color: #3365a8;
  font-size: 11px;
`;

export const RequestValue = styled.Text`
  color: #3365a8;
  font-size: 11px;
`;

export const ProfileInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
`;

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

export const CardBody = styled.View`
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

export const CardBodyShort = styled.View`
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

export const CardHeader = styled.View`
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
  height: 80px;
  flex-direction: row;
  padding-left: 5px;
`;

export const ClockBlock = styled.View``;

export const ClockText = styled.Text.attrs(props => ({
  numberOfLines: props.short ? 1 : 5,
}))`
  color: #2a3152;
  font-size: 16px;
  font-weight: 400;
  text-align: justify;
`;

export const IconClockBlock = styled.View`
  align-items: center;
  width: 20%;
`;

export const IconClockSubBlock = styled.View`
  align-items: center;
  width: 20%;
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

export const InfoBlock = styled.View`
  align-items: center;
  justify-content: space-between;
  height: 80px;
  flex-direction: row;
  width: 80%;
`;

export const InfoData = styled.View`
  height: 80px;
  justify-content: center;
  padding-right: 15px;
  width: ${({ short }) => (short ? '100%' : '80%')};
`;

export const InfoDataBadge = styled.Image.attrs(({ color }) => {
  switch (color) {
    case 0: {
      return {
        resizeMode: 'contain',
        source: require('../../../assets/aba1.png'),
      };
    }

    case 1: {
      return {
        resizeMode: 'contain',
        source: require('../../../assets/aba2.png'),
      };
    }

    default: {
      return {
        resizeMode: 'contain',
        source: require('../../../assets/aba1.png'),
      };
    }
  }
})`
  right: 10px;
  height: 30px;
  position: absolute;
  top: -6px;
  width: 20px;
`;

export const InfoDataNameLong = styled.Text`
  color: #5022b2;
  font-size: 16px;
  font-weight: bold;
`;

export const InfoDataNameShort = styled.Text`
  color: #2a3152;
  font-size: 16px;
`;

export const InfoDataTitleLong = styled.Text.attrs({ numberOfLines: 2 })`
  color: #2a3152;
  font-size: 18px;
  font-weight: 400;
`;

export const InfoDataTitleShort = styled.Text.attrs({ numberOfLines: 1 })`
  color: #2a3152;
  font-size: 18px;
  font-weight: bold;
`;

export const InfoSubData = styled.View`
  width: 100%;
`;

export const InfoSubStar = styled.View`
  align-items: center;
  border-left-color: #f2f2f2;
  border-left-width: 1px;
  height: 100px;
  justify-content: center;
  width: 15%;
`;

export const InfoValue = styled.View`
  align-items: center;
  border-left-color: #f2f2f2;
  border-left-width: 1px;
  height: 80px;
  justify-content: center;
  width: 20%;
`;

export const Item = styled.View`
  align-items: center;
  flex-direction: row;
  padding-vertical: 10px;
`;

export const SubBlock = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-right: 15px;
  width: 79%;
`;

export const CardSubBody = styled.View`
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
  flex-direction: row;
`;

export const CardBodyView = styled.View`
  padding-horizontal: 20px;
  padding-vertical: 10px;
`;

export const CardTitle = styled.Text`
  color: #2a3152;
  font-size: 16px;
  font-weight: bold;
`;

export const CardDescription = styled.Text.attrs({ numberOfLines: 7 })`
  color: #2a3152;
  font-size: 16px;
  font-weight: 400;
  padding-top: 10px;
  text-align: justify;
`;

export const ParentAvatar = styled.Image`
  border-color: ${({ color }) => colors[color] || colors[0]};
  border-radius: 15px;
  border-width: 2px;
  height: 30px;
  left: -2px;
  width: 30px;
`;

export const ParentBlock = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  margin-horizontal: 10px;
  margin-top: 20px;
`;

export const ParentOption = styled.TouchableOpacity`
  align-items: center;
  background-color: #fff;
  border-color: ${({ color }) => colors[color] || colors[0]};
  border-radius: 20px;
  border-width: 2px;
  flex-direction: row;
  height: 40px;
  padding: 5px;
  margin-right: 10px;
`;

export const ParentNameText = styled.Text`
  color: ${({ color }) => colors[color] || colors[0]};
  font-size: 16px;
  font-weight: bold;
  padding-horizontal: 10px;
`;
