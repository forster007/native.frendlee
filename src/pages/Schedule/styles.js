import styled from 'styled-components/native';

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
  contentContainerStyle: {
    paddingTop: 15,
  },
})`
  padding-horizontal: 20px;
`;

export const AppointmentsCard = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  background-color: #ffffff;
  border-color: transparent;
  border-radius: 5px;
  flex-direction: column;
  height: ${({ expanded }) => (expanded ? '400px' : '210px')};
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
`;

export const CardBody = styled.View`
  justify-content: center;
  padding-horizontal: 10px;
`;

export const CardBodyDivisor = styled.View`
  background-color: #f2f2f2;
  height: 1px;
  margin-vertical: 10px;
  width: 100%;
`;

export const CardBodyItem = styled.View``;

export const CardBodyItemInfo = styled.View`
  align-items: center;
  flex-direction: row;
  width: 60%;
`;

export const CardBodyItemInfoIconClock = styled.Image.attrs({
  resizeMode: 'contain',
  source: require('../../../assets/frendlee-customer-clock.png'),
})`
  height: 20px;
  width: 20px;
`;

export const CardBodyItemInfoIconNav = styled.Image.attrs({
  resizeMode: 'contain',
  source: require('../../../assets/frendlee-customer-nav.png'),
})`
  height: 20px;
  width: 20px;
`;

export const CardBodyItemInfoText = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 14px;
  margin-left: 10px;
`;

export const CardFooter = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
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

export const CardHeader = styled.View``;

export const CardProviderProfile = styled.View`
  align-items: center;
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
  flex-direction: row;
  height: 80px;
  padding-left: 10px;
  width: 100%;
`;

export const CardProviderProfileAvatar = styled.Image`
  border-color: #e1eaf5;
  border-radius: 30px;
  border-width: 2px;
  height: 60px;
  margin-right: 10px;
  padding: 10px;
  width: 60px;
`;

export const CardProviderProfileInfo = styled.View``;

export const CardProviderProfileNameText = styled.Text`
  color: #2a3152;
  font-size: 16px;
`;

export const CardProviderProfileTitleText = styled.Text`
  color: #2a3152;
  font-size: 20px;
  font-weight: bold;
`;

/*
backgroundColor: '#fff',
borderColor: '#fff',
borderRadius: 5,
borderWidth: 3,
elevation: 2,
justifyContent: 'center',
marginBottom: 10,
maxHeight: 200,
width: '100%',
*/
