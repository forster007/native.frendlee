import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, RefreshControl, View } from 'react-native';
import moment from 'moment';
import { Header } from '../../components';
import {
  ButtonSubmitCode,
  ButtonSubmitCodeText,
  Container,
  Content,
  Div,
  Divisor,
  Input,
  Label,
  ParentAction,
  ParentActionButton,
  ParentActionButtonIcon,
  ParentAvatar,
  ParentBirthdateText,
  ParentBlock,
  ParentInfo,
  ParentNameText,
  ParentRequestStatusText,
} from './styles';

import {
  getCustomerParents,
  postCustomerParent,
  updateCustomerParent,
} from '../../services/user';

export default function ParentConnect({ navigation }) {
  const account_type = useMemo(() => navigation.getParam('account_type'), [
    navigation,
  ]);
  const [customerParents, setCustomerParents] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [token, setToken] = useState('');

  const handleCustomerParents = useCallback(async () => {
    setRefreshing(true);
    const response = await getCustomerParents(true);
    setCustomerParents(response.data);
    setRefreshing(false);
  });

  const handleParentAction = useCallback(async obj => {
    switch (obj.status) {
      case 'approved': {
        Alert.alert(
          'WARNING',
          'Do you really want to accept this parent?',
          [
            {
              text: 'OK',
              onPress: async () => {
                await updateCustomerParent(obj);
                await handleCustomerParents();
              },
            },
            { text: 'Cancel', onPress: () => console.log('Canceled') },
          ],
          { cancelable: false }
        );
        break;
      }

      case 'rejected': {
        Alert.alert(
          'WARNING',
          'Do you really want to reject this parent?',
          [
            {
              text: 'OK',
              onPress: async () => {
                await updateCustomerParent(obj);
                await handleCustomerParents();
              },
            },
            { text: 'Cancel', onPress: () => console.log('Canceled') },
          ],
          { cancelable: false }
        );
        break;
      }

      default: {
        break;
      }
    }
  });

  const handleSubmitCode = useCallback(async () => {
    try {
      setLoading(true);
      await postCustomerParent({ token });
      await handleCustomerParents();
    } catch (error) {
      Alert.alert('WARNING', error.response.data.message);
    } finally {
      setLoading(false);
      setToken('');
    }
  });

  useEffect(() => {
    handleCustomerParents();
  }, []);

  useEffect(() => {
    setDisabled(!(token.length === 12));
  }, [token]);

  function renderListHeader() {
    switch (account_type) {
      case 'customer': {
        return (
          customerParents.length > 0 && (
            <View style={{ marginTop: 10 }}>
              <Label>Parents already connecteds and new requests:</Label>
            </View>
          )
        );
      }

      case 'parent': {
        return (
          customerParents.length > 0 && (
            <>
              <Divisor />
              <Label>Parents connecteds:</Label>
            </>
          )
        );
      }

      default: {
        return null;
      }
    }
  }

  function renderListItem({ item }) {
    switch (account_type) {
      case 'customer': {
        const { avatar } = item.parent;
        const birthdate = item.customer_nickname
          ? `${item.customer_nickname} - ${moment(item.parent.birthdate).format(
              'DD/MM/YYYY'
            )}`
          : `${moment(item.parent.birthdate).format('DD/MM/YYYY')}`;
        const name = `${item.parent.name} ${item.parent.lastname}`;

        let color = '';
        let status = '';

        switch (item.status) {
          case 'approved':
            color = '#00cf15';
            status = 'Request approved';
            break;

          case 'rejected':
            color = '#ff0000';
            status = 'Request rejected';
            break;

          default:
            color = '#585175';
            status = 'Waiting for approval';
            break;
        }

        return (
          <ParentBlock>
            <ParentAvatar source={avatar} />
            <ParentInfo>
              <ParentNameText>{name}</ParentNameText>
              <ParentBirthdateText>{birthdate}</ParentBirthdateText>
              <ParentRequestStatusText color={color}>
                {status}
              </ParentRequestStatusText>
            </ParentInfo>
            <ParentAction>
              <ParentActionButton
                disabled={item.status === 'approved'}
                onPress={() =>
                  handleParentAction({ status: 'approved', id: item.id })
                }
              >
                <ParentActionButtonIcon
                  color={item.status === 'approved' ? '#cdcdcd' : '#00cf15'}
                  name="check-circle-o"
                />
              </ParentActionButton>
              <ParentActionButton
                disabled={item.status === 'rejected'}
                onPress={() =>
                  handleParentAction({ status: 'rejected', id: item.id })
                }
              >
                <ParentActionButtonIcon
                  color={item.status === 'rejected' ? '#cdcdcd' : '#ff0000'}
                  name="times-circle-o"
                />
              </ParentActionButton>
            </ParentAction>
          </ParentBlock>
        );
      }

      case 'parent': {
        const { avatar } = item.customer;
        const birthdate = item.parent_nickname
          ? `${item.parent_nickname} - ${moment(item.customer.birthdate).format(
              'DD/MM/YYYY'
            )}`
          : `${moment(item.customer.birthdate).format('DD/MM/YYYY')}`;
        const name = `${item.customer.name} ${item.customer.lastname}`;

        let color = '';
        let status = '';

        switch (item.status) {
          case 'approved':
            color = '#00cf15';
            status = 'Request approved';
            break;

          case 'rejected':
            color = '#ffff00';
            status = 'Request rejected';
            break;

          default:
            color = '#585175';
            status = 'Waiting for approval';
            break;
        }

        return (
          <ParentBlock>
            <ParentAvatar source={avatar} />
            <ParentInfo>
              <ParentNameText>{name}</ParentNameText>
              <ParentBirthdateText>{birthdate}</ParentBirthdateText>
              <ParentRequestStatusText color={color}>
                {status}
              </ParentRequestStatusText>
            </ParentInfo>
            <ParentAction />
          </ParentBlock>
        );
      }

      default:
        return null;
    }
  }

  return (
    <Container>
      <Header
        left="goBack"
        right="none"
        title="Connect to my parent"
        titleAlign="left"
      />

      {account_type === 'parent' && (
        <Div>
          <Label>Insert the parent code:</Label>

          <Input
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={12}
            onChangeText={setToken}
            value={token}
          />

          <ButtonSubmitCode
            disabled={disabled || loading}
            onPress={handleSubmitCode}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <ButtonSubmitCodeText>Connect</ButtonSubmitCodeText>
            )}
          </ButtonSubmitCode>
        </Div>
      )}

      <Content
        data={customerParents}
        keyExtractor={item => `customer-parents-${item.id}`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleCustomerParents}
          />
        }
        renderItem={renderListItem}
        ListEmptyComponent={<Div />}
        ListHeaderComponent={renderListHeader}
      />
    </Container>
  );
}
