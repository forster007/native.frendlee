import { Platform, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

export const Container = styled.View`
  align-items: center;
  background-color: #fff;
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
  elevation: 5;
  flex-direction: row;
  justify-content: space-between;
  height: ${Platform.OS === 'ios' ? Constants.statusBarHeight + 54 : 54}px;
  padding-horizontal: 20px;
  padding-top: ${Platform.OS === 'ios' ? Constants.statusBarHeight : 0}px;
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
  width: 15%;
`;

export const Title = styled.Text`
  color: #5022b2;
  font-size: 22px;
  font-weight: bold;
`;
