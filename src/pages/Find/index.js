import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, AppState } from 'react-native';
import { Header } from '../../components';
import { storeOnesignal } from '~/services/onesignal';
import { getProviders } from '~/services/providers';
import { disconnect } from '~/services/websocket';

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
  ProviderCardShort,
  ProviderCardShortAvatar,
  ProviderCardShortBody,
  ProviderCardShortFooter,
  ProviderCardShortFooterText,
  ProviderName,
  ProviderProfile,
  ProviderProfileInfo,
  ProviderRating,
  ProviderRatingIcon,
  ProviderRatingText,
  ProviderTreatments,
  InfoBlock,
} from './styles';

export default function Find({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState([]);
  const [selected, setSelected] = useState(new Map());

  const handleAppState = useCallback(nextAppState => {
    if (nextAppState === 'background') {
      disconnect();
    }
  });

  const handleNotification = useCallback(data => {
    if (data.origin === 'selected') {
      navigation.navigate('Schedule');
    }
  });

  const handleNotifications = useCallback(async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      Alert.alert('OPS...', 'No notification permissions!');
      return;
    }

    const onesignal = await Notifications.getExpoPushTokenAsync();
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
    // handleNotifications();
    handleProviders();
    // AppState.addEventListener('change', handleAppState);
    // const notificationSubscription = Notifications.addListener(
    //   handleNotification
    // );
    // return () => {
    //   AppState.removeEventListener('change', handleAppState);
    //   notificationSubscription.remove();
    // };
  }, []);

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
      <Header right="menu" title="Available Frendlees" />
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
