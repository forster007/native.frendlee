import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import { pushMessageRequest } from '../../store/modules/websocket/actions';
import { Header } from '~/components';
import { Container, Content } from './styles';

export default function Chat({ navigation }) {
  const dispatch = useDispatch();
  const allMessages = useSelector(state => state.websocket.messages);
  const { uid: _id, email } = useSelector(state => state.auth.user);
  const [messages, setMessages] = useState([]);

  const { id: appointment_id, provider } = useMemo(
    () => navigation.getParam('appointment'),
    [navigation]
  );

  const handleMessages = useCallback(async () => {
    if (allMessages) {
      const msgs = allMessages.find(e => e.appointment_id === appointment_id);
      setMessages(msgs.messages);
    }
  });

  const handleSingleMessage = useCallback(e => {
    e[0].appointment_id = appointment_id;
    dispatch(pushMessageRequest(e[0]));
  });

  useEffect(() => {
    handleMessages();
  }, [allMessages]);

  return (
    <Container>
      <Header
        titleAlign="left"
        left="goBack"
        right="none"
        title={`${provider.name} ${provider.lastname}`}
      />
      <Content>
        <GiftedChat
          alwaysShowSend
          inverted={false}
          onSend={e => handleSingleMessage(e)}
          messages={messages}
          user={{ _id, email }}
        />
      </Content>
    </Container>
  );
}
