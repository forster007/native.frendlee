import React, { useCallback, useEffect, useState } from 'react';
import { Share, Text, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import { Header } from '~/components';
import {
  ButtonConnectParent,
  ButtonConnectParentText,
  ButtonParentNewRequest,
  ButtonParentNewRequestBadge,
  ButtonParentNewRequestBadgeText,
  ButtonParentNewRequestIcon,
  ButtonParentNewRequestText,
  ButtonShareParent,
  ButtonShareParentText,
  Container,
  Content,
  Div,
  Divisor,
  Input,
  Label,
  ProfileAvatar,
  ProfileName,
  ProfileNameText,
} from './styles';

import {
  getCustomerParents,
  getCustomerProfile,
  getCustomerToken,
  getParentProfile,
} from '~/services/user';

import { isEmpty } from '~/services/helpers';

function Profile({ isFocused, navigation }) {
  const { account_type } = useSelector(state => state.auth.user);
  const [customerParents, setCustomerParents] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [name, setName] = useState('');
  const [profile, setProfile] = useState({});
  const [token, setToken] = useState('');

  const handleConnectParent = useCallback(() =>
    navigation.navigate('ParentConnect', { account_type })
  );

  const handleCustomerParents = useCallback(async () => {
    const response = await getCustomerParents();
    setCustomerParents(response.data);
  });

  const handleCustomerToken = useCallback(async () => {
    const response = await getCustomerToken();
    setToken(response.data.token);
  });

  const handleProfile = useCallback(async () => {
    setFirstLoad(false);

    switch (account_type) {
      case 'customer': {
        const response = await getCustomerProfile();
        handleCustomerParents();
        handleCustomerToken();
        setProfile(response.data);
        break;
      }

      case 'parent': {
        const response = await getParentProfile();
        setProfile(response.data);
        break;
      }

      default:
        break;
    }
  });

  const handleShare = useCallback(async () => {
    const shareOptions = {
      message: `Use this token to connect to your parent: \n${token}`,
    };

    Share.share(shareOptions);
  });

  useEffect(() => {
    if (isFocused && !firstLoad) handleCustomerParents();
  }, [isFocused]);

  useEffect(() => {
    setName(`${profile.name} ${profile.lastname}`);
  }, [profile]);

  useEffect(() => {
    handleProfile();
  }, []);

  function renderParent() {
    if (!isEmpty(customerParents)) {
      const waitingForApproval = customerParents.filter(
        e => e.status === 'waiting'
      );

      const buttonText = !isEmpty(waitingForApproval)
        ? waitingForApproval.length === 1
          ? 'You have a new connection request'
          : 'You have some new connection request'
        : 'Go to my parent list';

      return (
        <>
          <ButtonParentNewRequest onPress={handleConnectParent}>
            {waitingForApproval.length > 0 && (
              <ButtonParentNewRequestBadge>
                <ButtonParentNewRequestBadgeText>
                  {waitingForApproval.length}
                </ButtonParentNewRequestBadgeText>
              </ButtonParentNewRequestBadge>
            )}
            <ButtonParentNewRequestIcon />
            <ButtonParentNewRequestText>
              {buttonText}
            </ButtonParentNewRequestText>
          </ButtonParentNewRequest>

          <Divisor />
        </>
      );
    }

    return null;
  }

  function renderProfile() {
    switch (account_type) {
      case 'customer': {
        return (
          <Div>
            {renderParent()}
            <ButtonConnectParent onPress={handleCustomerToken}>
              <ButtonConnectParentText>
                Generate new token to my parent
              </ButtonConnectParentText>
            </ButtonConnectParent>

            <Divisor />

            <Label>Send this code to your parent:</Label>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              editable={false}
              maxLength={12}
              onChangeText={setToken}
              value={token}
            />

            <ButtonShareParent onPress={handleShare}>
              <ButtonShareParentText>Share this code</ButtonShareParentText>
            </ButtonShareParent>

            <Divisor />
          </Div>
        );
      }

      case 'parent': {
        return (
          <Div>
            <ButtonConnectParent onPress={handleConnectParent}>
              <ButtonConnectParentText>
                Connect to my parent
              </ButtonConnectParentText>
            </ButtonConnectParent>
          </Div>
        );
      }

      default: {
        return <View />;
      }
    }
  }

  return (
    <Container>
      <Header left="goBack" right="none" title="Profile" titleAlign="left" />

      <Content>
        <ProfileAvatar source={profile.avatar}>
          <ProfileName>
            <ProfileNameText>{name}</ProfileNameText>
          </ProfileName>
        </ProfileAvatar>

        {renderProfile()}
      </Content>
    </Container>
  );
}

export default withNavigationFocus(Profile);
