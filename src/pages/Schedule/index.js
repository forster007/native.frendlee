import React, { useCallback, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getAppointments, updateAppointments } from '~/services/appointments';
import { getCustomerParents } from '~/services/user';
import { messagesRequest } from '../../store/modules/websocket/actions';
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
  InfoDataBadge,
  InfoDataNameShort,
  InfoDataTitleShort,
  InfoSubData,
  Item,
  ParentAvatar,
  ParentBlock,
  ParentOption,
  ParentNameText,
  SubBlock,
} from './styles';
import { Header } from '../../components';

function Schedule({ isFocused, navigation }) {
  const dispatch = useDispatch();
  const { account_type } = useSelector(state => state.auth.user);
  const [appointments, setAppointments] = useState([]);
  const [colors, setColors] = useState([]);
  const [counter, setCounter] = useState(false);
  const [customerParents, setCustomerParents] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(new Map());

  const handleAppointments = useCallback(async () => {
    setFirstLoad(false);
    setLoading(true);

    const { data } = await getAppointments();

    dispatch(messagesRequest());
    setAppointments(data);
    setLoading(false);
  });

  const handleCustomerParents = useCallback(async () => {
    const response = await getCustomerParents();
    setCustomerParents(response.data);
  });

  const handleFooterAction = useCallback((action, appointment) => {
    switch (action) {
      case 'cancel': {
        const obj = { appointment_id: appointment.id, status: 'canceled' };

        Alert.alert(
          'WARNING',
          'Do you really want to cancel this appointment?',
          [
            {
              text: 'OK',
              onPress: async () => {
                await updateAppointments(obj);
                await handleAppointments();
              },
            },
            { text: 'Cancel', onPress: () => console.log('Done') },
          ],
          { cancelable: false }
        );

        break;
      }

      case 'pay': {
        Alert.alert(
          'WARNING',
          'Do you really want to pay this appointment?',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Payment', { appointment }),
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
    handleCustomerParents();
  }, []);

  useEffect(() => {
    const timeToUpdate = setInterval(() => {
      handleAppointments();
    }, 120 * 1000);

    return () => {
      clearInterval(timeToUpdate);
    };
  }, [counter]);

  useEffect(() => {
    if (isFocused && !firstLoad) {
      handleAppointments();
      handleCustomerParents();
    }
  }, [isFocused]);

  function renderCardActions(appointment) {
    switch (appointment.status) {
      case 'opened': {
        return (
          <CardActionFooter>
            <ActionButton />
            <ActionButton
              onPress={() => handleFooterAction('cancel', appointment)}
            >
              <ActionButtonText>Cancel</ActionButtonText>
            </ActionButton>
          </CardActionFooter>
        );
      }

      case 'confirmed': {
        return (
          <CardActionFooter>
            <ActionButton
              onPress={() => handleFooterAction('pay', appointment)}
            >
              <ActionButtonText>Pay</ActionButtonText>
            </ActionButton>
            <ActionButton
              onPress={() => handleFooterAction('cancel', appointment)}
            >
              <ActionButtonText>Cancel</ActionButtonText>
            </ActionButton>
          </CardActionFooter>
        );
      }

      case 'finished': {
        if (appointment.customer_rating === false) {
          return (
            <CardActionFooter>
              <ActionButton
                onPress={() =>
                  navigation.navigate('ScheduleDetail', { appointment })
                }
              >
                <ActionButtonText>Rate treatment</ActionButtonText>
              </ActionButton>
            </CardActionFooter>
          );
        }

        return null;
      }

      case 'payed': {
        return (
          <View>
            <CardActionFooter>
              <ActionButton
                onPress={() =>
                  navigation.navigate('ScheduleDetail', { appointment })
                }
              >
                <ActionButtonText>Start appointment</ActionButtonText>
              </ActionButton>
              <ActionButton />
            </CardActionFooter>
            <CardActionFooter>
              <ActionButton
                onPress={() => navigation.navigate('Chat', { appointment })}
              >
                <ActionButtonText>Message</ActionButtonText>
              </ActionButton>
              <ActionButton
                onPress={() => handleFooterAction('cancel', appointment)}
              >
                <ActionButtonText>Cancel</ActionButtonText>
              </ActionButton>
            </CardActionFooter>
          </View>
        );
      }

      case 'started': {
        return (
          <CardActionFooter>
            <ActionButton
              onPress={() =>
                navigation.navigate('ScheduleDetail', { appointment })
              }
            >
              <ActionButtonText>Finish treatment</ActionButtonText>
            </ActionButton>
          </CardActionFooter>
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
      customer_id,
      customer_rating,
      detail,
      finish_at,
      id,
      observation,
      provider,
      start_at,
      started_at,
      status,
    } = appointment;

    const { avatar } = provider;
    const indexId = customerParents.findIndex(
      e => e.customer_id === customer_id
    );

    console.log(indexId);
    const dateClockStart = moment(start_at).format('HH');
    const dateClockFinish = moment(finish_at).format('HH[h]');
    const dateLong = moment(start_at).format('dddd, MMMM DD');
    const dateShort = `${dateClockStart} - ${dateClockFinish}`;
    const name = `${provider.name} ${provider.lastname}`;
    const title = detail.service.name;
    const expanded = !!selected.get(id);

    let statusText = '';

    switch (status) {
      case 'confirmed':
        statusText = 'Waiting payment';
        break;

      case 'finished': {
        statusText = customer_rating === false ? 'Waiting rating' : 'FINISHED';
        break;
      }

      case 'opened':
        statusText = 'Waiting confirmation';
        break;

      case 'payed':
        statusText = 'Waiting start';
        break;

      case 'started':
        statusText = `Started ${moment(started_at).fromNow()}`;
        setCounter(true);
        break;

      default:
        statusText = status;
    }

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

            {renderCardActions(appointment)}

            <CardFooter status={status}>
              <CardFooterText>{statusText}</CardFooterText>
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
                  <InfoDataBadge color={indexId} />
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
              <CardFooterText>{statusText}</CardFooterText>
            </CardFooter>
          </Card>
        );
      }

      default: {
        return null;
      }
    }
  }

  function renderCustomerParents() {
    if (account_type === 'parent') {
      return (
        <ParentBlock>
          {customerParents.map(parent => {
            const { customer, id, parent_nickname } = parent;
            const name = parent_nickname || customer.name;
            const indexId = customerParents.findIndex(e => e.id === id);

            return (
              <ParentOption color={indexId} key={`customer-parent-${id}`}>
                <ParentAvatar color={indexId} source={customer.avatar} />
                <ParentNameText color={indexId}>{name}</ParentNameText>
              </ParentOption>
            );
          })}
        </ParentBlock>
      );
    }

    return null;
  }

  return (
    <Container>
      <Header
        titleAlign="left"
        left="goBack"
        right="none"
        title="Your Appointments"
      />

      <Content>
        {renderCustomerParents()}

        <Appointments
          data={appointments}
          extraData={selected}
          keyExtractor={appointment => `appointment-${appointment.id}`}
          onRefresh={handleAppointments}
          refreshing={loading}
          renderItem={renderAppointments}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Empty>No appointments available</Empty>}
        />
      </Content>
    </Container>
  );
}

export default withNavigationFocus(Schedule);
