import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components';

import { Container, Content } from './styles';

export default function ProviderDetail({ navigation }) {
  const [provider, setProvider] = useState({});
  const [selected, setSelected] = useState(new Map());

  const providerId = useMemo(() => navigation.getParam('id'), [navigation]);

  useEffect(() => {
    console.log(providerId);
  }, []);

  return (
    <Container>
      <Header left="goBack" right="none" title="Frendlee" />
      <Content />
    </Container>
  );
}
