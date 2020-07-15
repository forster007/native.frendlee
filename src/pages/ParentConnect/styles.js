import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

export const Container = styled.View`
  background-color: #dcd9e3;
  flex: 1;
`;

export const Content = styled.FlatList`
  background-color: #dcd9e3;
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
  flex: 1;
  padding-horizontal: 10px;
`;

export const ButtonSubmitCode = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  align-items: center;
  background-color: ${({ disabled }) => (disabled ? '#a9a9a9' : '#7244d4')};
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  height: 50px;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
`;

export const ButtonSubmitCodeText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export const Div = styled.View`
  padding-horizontal: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const Divisor = styled.View`
  background-color: #f2f2f2;
  height: 1px;
  margin-bottom: 10px;
  margin-top: 5px;
  width: 100%;
`;

export const Input = styled.TextInput`
  align-items: center;
  background-color: #ffffff;
  border-radius: 4px;
  color: #585175;
  font-size: 17px;
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

export const ParentAction = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 30%;
`;

export const ParentActionButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  align-items: center;
  height: 50px;
  justify-content: center;
  width: 50%;
`;

export const ParentActionButtonIcon = styled(FontAwesome)`
  font-size: 40px;
`;

export const ParentAvatar = styled.Image`
  border-color: #e1eaf5;
  border-radius: 30px;
  border-width: 2px;
  height: 60px;
  width: 60px;
`;

export const ParentBirthdateText = styled.Text`
  color: #4f4f4f;
  font-size: 14px;
  font-weight: 500;
`;

export const ParentBlock = styled.View`
  align-items: center;
  background-color: #ffffff;
  border-color: #f2f2f2;
  border-radius: 5px;
  border-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
`;

export const ParentInfo = styled.View`
  padding-left: 10px;
  width: 55%;
`;

export const ParentNameText = styled.Text`
  color: #4f4f4f;
  font-size: 18px;
  font-weight: bold;
`;

export const ParentRequestStatusText = styled.Text`
  color: ${({ color }) => color || '#4f4f4f'};
  font-size: 14px;
  font-weight: bold;
`;
