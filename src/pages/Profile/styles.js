import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #dcd9e3;
  flex: 1;
`;

export const Content = styled.View`
  background-color: #ffffff;
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
  flex: 1;
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
`;

export const ButtonShareParentText = styled.Text`
  color: #7244d4;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export const Div = styled.View`
  padding-horizontal: 10px;
`;

export const Divisor = styled.View`
  background-color: #f2f2f2;
  height: 1px;
  margin-bottom: 5px;
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
