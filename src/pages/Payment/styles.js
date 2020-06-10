import styled from 'styled-components/native';
import CreditCard from 'react-native-credit-card';
import { TextInputMask } from 'react-native-masked-text';

export const ButtonSubmit = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.7,
  disabled: !props.state,
}))`
  align-items: center;
  background-color: ${props => (props.state ? '#7244d4' : '#cdcdcd')};
  border-radius: 4px;
  elevation: 2;
  height: 42px;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
`;

export const ButtonSubmitText = styled.Text`
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
`;

export const Card = styled.View`
  background-color: #dcd9e3;
`;

export const CardBody = styled.View`
  padding-horizontal: 30px;
  padding-top: 40px;
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
  align-self: center;
  padding-horizontal: 20px;
  padding-vertical: 5px;
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

export const Container = styled.View`
  background-color: #dcd9e3;
  flex: 1;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 20,
  },
})`
  background-color: #dcd9e3;
  flex: 1;
`;

export const Credit = styled(CreditCard).attrs({
  imageFront: require('../../../assets/card-front.png'),
  imageBack: require('../../../assets/card-back.png'),
  height: 230,
  width: 350,
})`
  align-self: center;
  margin-bottom: 20px;
`;

export const Input = styled.TextInput`
  align-items: center;
  background-color: #e0e0e0;
  border-radius: 4px;
  box-shadow: 0px -1px -1px rgba(0, 0, 0, 0.35);
  color: #585175;
  elevation: 2;
  font-size: 17px;
  height: 48px;
  padding: 0 10px;
  width: 100%;
`;

export const InputBlock = styled.View`
  align-self: center;
  flex-direction: ${({ direction }) => direction || 'column'};
  justify-content: ${({ direction }) =>
    direction ? 'space-between' : 'flex-start'};
  margin-top: ${({ direction }) => (direction ? '0px' : '10px')};
  width: ${({ width }) => width || '350px'};
`;

export const InputCreditCard = styled(TextInputMask).attrs({
  type: 'credit-card',
})`
  align-items: center;
  background-color: #e0e0e0;
  border-radius: 4px;
  box-shadow: 0px -1px -1px rgba(0, 0, 0, 0.35);
  color: #585175;
  elevation: 2;
  font-size: 17px;
  height: 48px;
  padding: 0 10px;
  width: 100%;
`;

export const InputDate = styled(TextInputMask).attrs({
  options: { format: 'MM/YY' },
  type: 'datetime',
})`
  align-items: center;
  background-color: #e0e0e0;
  border-radius: 4px;
  box-shadow: 0px -1px -1px rgba(0, 0, 0, 0.35);
  color: #585175;
  elevation: 2;
  font-size: 17px;
  height: 48px;
  padding: 0 10px;
  width: 100%;
`;

export const InputLabel = styled.Text`
  color: #585175;
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 10px;
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
