import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const screenWidth = Math.round(Dimensions.get('window').width);

export const Container = styled.View`
  background-color: #302d46;
  flex: 1;
  flex-wrap: wrap;
  padding-top: 50px;
`;

export const IconBlock = styled.TouchableOpacity`
  align-items: center;
  background-color: #302d46;
  height: ${screenWidth / 2.5}px;
  justify-content: flex-start;
  width: ${screenWidth / 2}px;
`;

export const IconImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 65px;
  width: 65px;
`;

export const IconText = styled.Text`
  color: #ffffff;
  font-size: 20px;
  flex-wrap: wrap;
  margin-top: 10px;
  max-width: 50%;
  text-align: center;
`;
