import React, { useEffect } from 'react';
import { Header } from '~/components';
import { Container } from './styles';

export default function Chat() {
  useEffect(() => {}, []);

  return (
    <Container>
      <Header left="goBack" right="none" title="Loading Messages" />
    </Container>
  );
}
