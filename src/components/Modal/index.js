import React from 'react';
import { Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { signOutRequest } from '../../store/modules/auth/actions';
import Header from '../Header';
import { Container, IconBlock, IconImage, IconText } from './styles';

export default function App({ modalVisible, setModalVisible }) {
  const dispatch = useDispatch();

  return (
    <Modal
      animationType="slide"
      presentationStyle="fullScreen"
      statusBarTranslucent
      transparent={false}
      visible={modalVisible}
    >
      <Header
        background="#302D46"
        titleAlign="left"
        left="none"
        right="close"
        rightFunction={setModalVisible}
        rightProps={modalVisible}
      />
      <Container>
        <IconBlock>
          <IconImage
            source={require('../../../assets/frendlee-icon-about.png')}
          />
          <IconText>About us</IconText>
        </IconBlock>
        <IconBlock>
          <IconImage
            source={require('../../../assets/frendlee-icon-faq.png')}
          />
          <IconText>Common questions</IconText>
        </IconBlock>
        <IconBlock>
          <IconImage
            source={require('../../../assets/frendlee-icon-feedback.png')}
          />
          <IconText>Contact us</IconText>
        </IconBlock>
        <IconBlock onPress={() => dispatch(signOutRequest())}>
          <IconImage
            source={require('../../../assets/frendlee-icon-exit.png')}
          />
          <IconText>Exit the app</IconText>
        </IconBlock>
        <IconBlock>
          <IconImage
            source={require('../../../assets/frendlee-icon-privacy.png')}
          />
          <IconText>Privacy policy</IconText>
        </IconBlock>
        <IconBlock>
          <IconImage
            source={require('../../../assets/frendlee-icon-terms.png')}
          />
          <IconText>Terms of use</IconText>
        </IconBlock>
        <IconBlock>
          <IconImage
            source={require('../../../assets/frendlee-icon-tutorial.png')}
          />
          <IconText>How to use the app</IconText>
        </IconBlock>
      </Container>
    </Modal>
  );
}
