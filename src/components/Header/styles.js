import { Platform, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import styled from 'styled-components/native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

export const Container = styled.View`
  align-items: center;
  background-color: ${({ background }) => background || '#fff'};
  border-bottom-color: ${({ background }) => background || '#fff'};
  border-bottom-width: 1px;
  elevation: ${({ background }) => (background ? '0' : '5')};
  flex-direction: row;
  justify-content: space-between;
  height: ${Platform.OS === 'ios' ? Constants.statusBarHeight + 54 : 54}px;
  padding-horizontal: 20px;
  padding-top: ${Platform.OS === 'ios' ? Constants.statusBarHeight : 0}px;
`;

export const CloseIcon = styled(AntDesign)`
  font-size: 24px;
  color: ${({ color }) => color || '#ffffff'};
`;

export const InfoIcon = styled(FontAwesome)`
  font-size: 24px;
  color: ${({ color }) => color || '#5022b2'};
`;

export const InfoIconButton = styled(TouchableOpacity).attrs({
  hitSlop: {
    bottom: 10,
    left: 10,
    right: 10,
    top: 10,
  },
})`
  align-items: ${({ align }) => align || 'flex-start'};
  width: 10%;
`;

export const Title = styled.Text`
  color: #5022b2;
  font-size: 22px;
  font-weight: bold;
  text-align: ${({ align }) => align || 'center'};
  top: 2px;
  width: 80%;
`;
