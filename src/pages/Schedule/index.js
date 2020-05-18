import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import moment from 'moment';
import { getAppointments, updateAppointments } from '~/services/appointments';
import { storeOnesignal } from '~/services/onesignal';
import {
  ActionButton,
  ActionButtonText,
  Container,
  Content,
  Empty,
  Appointments,
  Avatar,
  AvatarBlock,
  Card,
  CardBody,
  Divisor,
  CardTitle,
  CardBodyView,
  CardActionFooter,
  CardDescription,
  CardFooter,
  CardFooterText,
  CardSubBody,
  CardHeader,
  ClockBlock,
  ClockText,
  IconAddress,
  IconClock,
  IconClockSubBlock,
  InfoBlock,
  InfoData,
  InfoDataNameShort,
  InfoDataTitleShort,
  InfoSubData,
  Item,
  SubBlock,
} from './styles';
import { Header } from '../../components';

export default function Schedule({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [selected, setSelected] = useState(new Map());

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

  const handleAppointments = useCallback(async () => {
    setLoading(true);
    const { data } = await getAppointments();

    setLoading(false);
    setAppointments(data);
  });

  const handleFooterAction = useCallback((action, appointment) => {
    switch (action) {
      case 'cancel': {
        const obj = {
          appointment_id: appointment.id,
          status: 'canceled',
        };

        Alert.alert(
          'WARNING',
          'Do you really want to cancel this appointment?',
          [
            {
              text: 'OK',
              onPress: () => {
                updateAppointments(obj);
                handleAppointments();
              },
            },
            { text: 'Cancel', onPress: () => console.log('Done') },
          ],
          { cancelable: false }
        );
        break;
      }

      default: {
        console.log('No action');
      }
    }
  });

  const handleSelected = useCallback(id => {
    const newSelected = new Map(selected);
    newSelected.set(id, !selected.get(id));

    setSelected(newSelected);
  });

  useEffect(() => {
    handleAppointments();
    handleNotifications();

    const notificationSubscription = Notifications.addListener(
      handleNotification
    );

    return () => {
      notificationSubscription.remove();
    };
  }, []);

  function renderCardActions(appointment) {
    switch (appointment.status) {
      case 'opened':
      case 'confirmed':
      case 'payed': {
        return (
          <>
            <ActionButton onPress={() => navigation.navigate('Chat')}>
              <ActionButtonText>Message</ActionButtonText>
            </ActionButton>
            <ActionButton
              onPress={() => handleFooterAction('cancel', appointment)}
            >
              <ActionButtonText>Cancel</ActionButtonText>
            </ActionButton>
          </>
        );
      }

      case 'started': {
        return (
          <>
            <ActionButton>
              <ActionButtonText>Finish treatment</ActionButtonText>
            </ActionButton>
          </>
        );
      }

      default: {
        return null;
      }
    }
  }

  function renderAppointments({ item: appointment }) {
    const {
      address,
      detail,
      finish_at,
      id,
      observation,
      provider,
      start_at,
      status,
      value,
    } = appointment;
    const { avatar } = provider;
    // const date = moment(start_at).format('YYYY-MM-DD HH:mm');
    const dateClockStart = moment(start_at).format('HH');
    const dateClockFinish = moment(finish_at).format('HH[h]');
    const dateLong = moment(start_at).format('dddd, MMMM DD');
    const dateShort = `${dateClockStart} - ${dateClockFinish}`;
    const name = `${provider.name} ${provider.lastname}`;
    const title = detail.service.name;
    const expanded = !!selected.get(id);

    switch (expanded) {
      case true: {
        return (
          <Card expanded onPress={() => handleSelected(id)}>
            <CardHeader>
              <AvatarBlock>
                <Avatar source={avatar} />
              </AvatarBlock>
              <InfoBlock>
                <InfoData short>
                  <InfoDataTitleShort>{title}</InfoDataTitleShort>
                  <InfoDataNameShort>{name}</InfoDataNameShort>
                </InfoData>
              </InfoBlock>
            </CardHeader>

            <CardBody>
              <CardSubBody>
                <InfoSubData>
                  <Item>
                    <IconClockSubBlock>
                      <IconClock />
                    </IconClockSubBlock>
                    <SubBlock>
                      <ClockBlock>
                        <ClockText>{dateLong}</ClockText>
                      </ClockBlock>
                      <View>
                        <ClockText>{dateShort}</ClockText>
                      </View>
                    </SubBlock>
                  </Item>

                  <Divisor />

                  <Item>
                    <IconClockSubBlock>
                      <IconAddress />
                    </IconClockSubBlock>
                    <SubBlock>
                      <ClockBlock>
                        <ClockText>{address}</ClockText>
                      </ClockBlock>
                    </SubBlock>
                  </Item>
                </InfoSubData>
              </CardSubBody>
            </CardBody>

            <CardBody>
              <CardBodyView>
                <CardTitle>What needs to be done:</CardTitle>
                <CardDescription>{observation}</CardDescription>
              </CardBodyView>
            </CardBody>

            <CardActionFooter>
              {renderCardActions(appointment)}
            </CardActionFooter>

            <CardFooter status={status}>
              <CardFooterText>{status}</CardFooterText>
            </CardFooter>
          </Card>
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
                <InfoData short>
                  <InfoDataTitleShort>{title}</InfoDataTitleShort>
                  <InfoDataNameShort>{name}</InfoDataNameShort>
                </InfoData>
              </InfoBlock>
            </CardHeader>

            <CardBody>
              <InfoSubData>
                <Item>
                  <IconClockSubBlock>
                    <IconClock />
                  </IconClockSubBlock>
                  <SubBlock>
                    <ClockBlock>
                      <ClockText>{dateLong}</ClockText>
                    </ClockBlock>
                    <View>
                      <ClockText>{dateShort}</ClockText>
                    </View>
                  </SubBlock>
                </Item>

                <Divisor />

                <Item>
                  <IconClockSubBlock>
                    <IconAddress />
                  </IconClockSubBlock>
                  <SubBlock>
                    <ClockBlock>
                      <ClockText short>{address}</ClockText>
                    </ClockBlock>
                  </SubBlock>
                </Item>
              </InfoSubData>
            </CardBody>

            <CardFooter status={status}>
              <CardFooterText>{status}</CardFooterText>
            </CardFooter>
          </Card>
        );
      }

      default: {
        return null;
      }
    }
  }

  return (
    <Container>
      <Header right="menu" title="Your appointments" />

      <Content>
        <Appointments
          data={appointments}
          extraData={selected}
          keyExtractor={appointment => `appointment-${appointment.id}`}
          onRefresh={handleAppointments}
          refreshing={loading}
          renderItem={renderAppointments}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Empty>No Appointments available.</Empty>}
        />
      </Content>
    </Container>
  );
}
