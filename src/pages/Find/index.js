import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, AppState, StatusBar } from 'react-native';
import { Header, Modal } from '../../components';
import { storeOnesignal } from '../../services/onesignal';
import { getProviders } from '../../services/providers';
import { connect, disconnect } from '../../services/websocket';

import {
  Avatar,
  AvatarBlock,
  Card,
  CardFooter,
  CardFooterText,
  CardHeader,
  Container,
  Content,
  Empty,
  InfoDataNameShort,
  InfoDataTitleShort,
  ProviderCard,
  ProviderCardLong,
  ProviderCardLongAvatar,
  ProviderCardLongBody,
  ProviderCardLongFooter,
  ProviderCardLongFooterText,
  ProviderCardLongFormation,
  ProviderCardLongFormationText,
  ProviderCardLongFrendleeTop,
  ProviderCardLongName,
  ProviderCardLongNameText,
  ProviderCardLongNote,
  ProviderCardLongRating,
  ProviderCardLongRatingIcon,
  ProviderCardLongRatingText,
  ProviderCardLongService,
  ProviderCardLongServices,
  ProviderCardLongServiceName,
  ProviderCardLongServiceNameText,
  ProviderCardLongServiceValue,
  ProviderCardLongServiceValueText,
  ProviderCardLongServiceValueTextBold,
  ProviderCardLongTreatments,
  ProviderCardLongTreatmentsIcon,
  ProviderCardLongTreatmentsText,
  ProviderCards,
  InfoBlock,
} from './styles';

export default function Find({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [providers, setProviders] = useState([]);
  const [selected, setSelected] = useState(new Map());
  const authState = useSelector(state => state.auth);

  const handleAppState = useCallback(nextAppState => {
    if (nextAppState === 'active') connect(authState.user);
    if (nextAppState === 'background') disconnect();
  });

  const handleNotification = useCallback(data => {
    if (data.origin === 'selected') {
      navigation.navigate('Schedule');
    }
  });

  const handleNotifications = useCallback(async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('OPS...', 'No notification permissions!');
      return;
    }

    const onesignal = (await Notifications.getExpoPushTokenAsync()).data;

    await storeOnesignal({ onesignal });
  });

  const handleProviders = useCallback(async () => {
    setLoading(true);
    const { data } = await getProviders();

    setProviders(data);
    setLoading(false);
  });

  const handleSelected = useCallback(id => {
    const newSelected = new Map(selected);
    newSelected.set(id, !selected.get(id));

    setSelected(newSelected);
  });

  useEffect(() => {
    handleNotifications();
    handleProviders();

    AppState.addEventListener('change', handleAppState);

    return () => {
      AppState.removeEventListener('change', handleAppState);
    };
  }, []);

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        StatusBar.setBarStyle('light-content');
      }, 300);
    } else {
      StatusBar.setBarStyle('dark-content');
    }
  }, [modalVisible]);

  function renderProviders({ item: provider }) {
    const name = `${provider.name} ${provider.lastname}`;
    const { avatar, formation, id, services, stars, treatments } = provider;
    const expanded = !!selected.get(id);

    switch (expanded) {
      case true: {
        return (
          <ProviderCard expanded onPress={() => handleSelected(id)}>
            <ProviderCardLong>
              <ProviderCardLongBody>
                <ProviderCardLongAvatar source={avatar}>
                  <ProviderCardLongName>
                    <ProviderCardLongNameText>{name}</ProviderCardLongNameText>
                  </ProviderCardLongName>
                </ProviderCardLongAvatar>
                <ProviderCardLongNote>
                  <ProviderCardLongRating>
                    <ProviderCardLongRatingText>
                      {stars}
                    </ProviderCardLongRatingText>
                    <ProviderCardLongRatingIcon />
                  </ProviderCardLongRating>

                  <ProviderCardLongTreatments>
                    <ProviderCardLongTreatmentsText>
                      {treatments}
                    </ProviderCardLongTreatmentsText>
                    <ProviderCardLongTreatmentsIcon />
                  </ProviderCardLongTreatments>

                  <ProviderCardLongFrendleeTop />
                </ProviderCardLongNote>
                <ProviderCardLongFormation>
                  <ProviderCardLongFormationText>
                    {formation}
                  </ProviderCardLongFormationText>
                </ProviderCardLongFormation>
                <ProviderCardLongServices>
                  {services.map(service => (
                    <ProviderCardLongService key={`service-key-${service.id}`}>
                      <ProviderCardLongServiceName>
                        <ProviderCardLongServiceNameText>
                          {service.name}
                        </ProviderCardLongServiceNameText>
                      </ProviderCardLongServiceName>
                      <ProviderCardLongServiceValue>
                        <ProviderCardLongServiceValueTextBold>
                          {`$${service.service_value.value}`}
                        </ProviderCardLongServiceValueTextBold>
                        <ProviderCardLongServiceValueText>
                          /hour
                        </ProviderCardLongServiceValueText>
                      </ProviderCardLongServiceValue>
                    </ProviderCardLongService>
                  ))}
                </ProviderCardLongServices>
              </ProviderCardLongBody>
              <ProviderCardLongFooter
                onPress={() => navigation.navigate('ProviderDetail', { id })}
              >
                <ProviderCardLongFooterText>
                  REQUEST SERVICE
                </ProviderCardLongFooterText>
              </ProviderCardLongFooter>
            </ProviderCardLong>
          </ProviderCard>
        );
      }

      case false: {
        return (
          <Card expanded={false} onPress={() => handleSelected(id)}>
            <CardHeader>
              <AvatarBlock>
                <Avatar source={avatar} />
              </AvatarBlock>
              <InfoBlock>
                <InfoDataTitleShort>{name}</InfoDataTitleShort>
                <InfoDataNameShort>{`${treatments} treatments`}</InfoDataNameShort>
              </InfoBlock>
            </CardHeader>
            <CardFooter>
              <CardFooterText>{formation}</CardFooterText>
            </CardFooter>

            {/* <ProviderCardShort>
              <ProviderCardShortBody>
                <ProviderProfile>
                  <AvatarBlock>
                    <ProviderCardShortAvatar source={avatar} />
                  </AvatarBlock>
                  <InfoBlock>
                    <ProviderName>{name}</ProviderName>
                    <ProviderTreatments>
                      {`${treatments} treatments`}
                    </ProviderTreatments>
                  </InfoBlock>
                </ProviderProfile>

                {treatments >= 10 && (
                  <ProviderRating>
                    <ProviderRatingIcon />
                    <ProviderRatingText>{stars}</ProviderRatingText>
                  </ProviderRating>
                )}
              </ProviderCardShortBody>
              <ProviderCardShortFooter>
                <ProviderCardShortFooterText>
                  {formation}
                </ProviderCardShortFooterText>
              </ProviderCardShortFooter>
            </ProviderCardShort> */}
          </Card>
        );
      }

      default:
        return null;
    }
  }

  return (
    <Container>
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <Header
        left="profile"
        right="menu"
        rightFunction={setModalVisible}
        rightProps={modalVisible}
        title="Available Frendlees"
      />
      <Content>
        <ProviderCards
          data={providers}
          extraData={selected}
          keyExtractor={workshop => `provider-card-${workshop.id}`}
          onRefresh={handleProviders}
          refreshing={loading}
          renderItem={renderProviders}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Empty>No Frendlees available.</Empty>}
        />
      </Content>
    </Container>
  );
}
