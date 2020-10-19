import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';

import api from '~/services/api';
import { getCustomerAddress } from '~/services/address';
import { storeAppointments } from '~/services/appointments';
import { getCustomerParents } from '~/services/user';
import { Header } from '~/components';
import { isEmpty } from '~/services/helpers';
import {
  Block,
  Container,
  Content,
  Input,
  Input2,
  InputDatePicker,
  InputGooglePlaces,
  ParentAvatar,
  ParentBlock,
  ParentCheckBox,
  ParentNameText,
  ParentOption,
  ParentSelection,
  ProviderCardAvatar,
  ProviderCardBiography,
  ProviderCardBiographyText,
  ProviderCardClock,
  ProviderCardClockIcon,
  ProviderCardClockInfo,
  ProviderCardClockInfoPeriodText,
  ProviderCardClockInfoText,
  ProviderCardDateTimeDuration,
  ProviderCardFormation,
  ProviderCardFormationText,
  ProviderCardFrendleeTop,
  ProviderCardInfo,
  ProviderCardInfoAge,
  ProviderCardInfoAgeIcon,
  ProviderCardInfoAgeText,
  ProviderCardInfoGender,
  ProviderCardInfoGenderIcon,
  ProviderCardInfoGenderText,
  ProviderCardName,
  ProviderCardNameText,
  ProviderCardNote,
  ProviderCardRating,
  ProviderCardRatingIcon,
  ProviderCardRatingText,
  ProviderCardStuff,
  ProviderCardStuffs,
  ProviderCardServices,
  ProviderCardServicesDescription,
  ProviderCardServicesSubTitleText,
  ProviderCardServicesTitleText,
  ProviderCardServicesOptions,
  ProviderCardServicesOption,
  ProviderCardServicesOptionText,
  ProviderCardServicesOptionTextBlock,
  ProviderCardServicesOptionValue,
  ProviderCardServicesOptionValueBlock,
  ProviderCardSubmit,
  ProviderCardSubmitButton,
  ProviderCardSubmitButtonText,
  ProviderCardTreatments,
  ProviderCardTreatmentsIcon,
  ProviderCardTreatmentsText,
  TermsCheckBox,
} from './styles';

export default function ProviderDetail({ navigation }) {
  const { account_type } = useSelector(state => state.auth.user);
  const scrollToView = useRef();
  const [provider, setProvider] = useState({});
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [avatar, setAvatar] = useState({});
  const [buttonState, setButtonState] = useState(false);
  const [checked, setChecked] = useState(false);
  const [clock, setClock] = useState('');
  const [customerParents, setCustomerParents] = useState([]);
  const [date, setDate] = useState(
    moment()
      .add(1, 'day')
      .format('YYYY-MM-DD 08:00')
  );
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(1);
  const [focused, setFocused] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [observation, setObservation] = useState('');
  const [observationLength, setObservationLength] = useState('');
  const [parentChecked, setParentChecked] = useState('');
  const [period, setPeriod] = useState('');
  const [provider_service_id, setServiceSelected] = useState();
  const [y, setY] = useState(0);
  const provider_id = useMemo(() => navigation.getParam('id'), [navigation]);

  const handleCustomerParents = useCallback(async () => {
    const response = await getCustomerParents();
    setCustomerParents(response.data);
    setParentChecked(response.data[0].customer_id);
  });

  const handeDuration = useCallback(option => {
    switch (option) {
      case 'up': {
        if (duration > 0 && duration < 6) {
          setDuration(duration + 1);
        }
        break;
      }

      case 'down': {
        if (duration > 1) {
          setDuration(duration - 1);
        }

        break;
      }

      default:
        break;
    }
  });

  const handleLocation = useCallback(async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('Warn!', 'We need access.');
    }

    const { coords } = await Location.getCurrentPositionAsync({});
    setLocation(`${coords.latitude},${coords.longitude}`);
  });

  const handleProviders = useCallback(async () => {
    const { data } = await api.get(`/providers/${provider_id}`);

    setProvider(data);
    setServiceSelected(data.services[0].id);
  });

  const handleServiceSelected = useCallback(serviceId => {
    setServiceSelected(serviceId);
  });

  const handleSubmit = useCallback(async () => {
    try {
      setButtonState(false);
      setLoading(true);
      let address_formated = '';

      if (checked) {
        const { data } = await getCustomerAddress(parentChecked);

        const street = data.complement
          ? `${data.street}, ${data.number} - ${data.complement}`
          : `${data.street}, ${data.number}`;

        address_formated = `${street} - ${data.district}, ${data.city} - ${data.state}, ${data.country}`;
      }

      const obj = {
        address: checked ? address_formated : address,
        date,
        checked,
        duration,
        location,
        observation,
        provider_id,
        provider_service_id,
      };

      if (account_type === 'parent') {
        Object.assign(obj, { customer_id: parentChecked });
      }

      await storeAppointments(obj);

      Alert.alert(
        'SUCCESS',
        'Appointment stored successfully.',
        [{ text: 'Ok', onPress: () => navigation.navigate('Schedule') }],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert('OPS...', error.response.data.error);
    } finally {
      setButtonState(true);
      setLoading(false);
    }
  });

  useEffect(() => {
    handleProviders();

    if (account_type === 'parent') handleCustomerParents();

    if (Platform.OS === 'android' && Constants.isDevice) {
      handleLocation();
    }

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    async function handleCheck() {
      if (checked) {
        const { data } = await getCustomerAddress(parentChecked);

        const street = data.complement
          ? `${data.street}, ${data.number} - ${data.complement}`
          : `${data.street}, ${data.number}`;

        setAddress(
          `${street} - ${data.district}, ${data.city} - ${data.state}, ${data.country}`
        );
        setLocation(
          `${street} - ${data.district}, ${data.city} - ${data.state}, ${data.country}`
        );
      }
    }

    handleCheck();
  }, [checked]);

  useEffect(() => {
    if (focused && isKeyboardVisible) {
      scrollToView.current.scrollTo({ x: 0, y: y + 280 });
    }
  }, [focused, isKeyboardVisible]);

  useEffect(() => {
    if (!isEmpty(provider)) {
      setAge(`${moment().diff(provider.birthdate, 'years')} years old`);
      setAvatar(provider.avatar);
      setClock(provider.clocks[0].name);
      setDescription(provider.description);
      setPeriod(provider.periods[0].name);
      setName(`${provider.name} ${provider.lastname}`);
    }
  }, [provider]);

  useEffect(() => {
    if (
      (address || checked) &&
      date &&
      duration &&
      observation &&
      provider_service_id
    ) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [address, checked, date, duration, observation, provider_service_id]);

  useEffect(() => {
    setObservationLength(`${observation.length}/255`);
  }, [observation]);

  function renderCustomerParents() {
    if (account_type === 'parent') {
      return (
        <ParentBlock>
          <ProviderCardServicesTitleText>
            Your request will be for
          </ProviderCardServicesTitleText>

          {customerParents.map(parent => {
            const { customer, customer_id, id, parent_nickname } = parent;
            const parentName = customer.name;
            const parentNickname = parent_nickname
              ? ` - ${parent_nickname}`
              : '';
            const indexId = customerParents.findIndex(e => e.id === id);

            return (
              <ParentOption
                color={indexId}
                key={`customer-parent-${id}`}
                onPress={() => setParentChecked(customer_id)}
              >
                <ParentAvatar color={indexId} source={customer.avatar} />
                <ParentSelection>
                  <ParentNameText
                    color={indexId}
                  >{`${parentName}${parentNickname}`}</ParentNameText>
                  <ParentCheckBox
                    checked={parentChecked === customer_id}
                    onPress={() => setParentChecked(customer_id)}
                  />
                </ParentSelection>
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
        left="goBack"
        right="none"
        title={name || 'Loading Frendlee'}
        titleAlign="left"
      />

      <KeyboardAvoidingView
        enabled={Platform.OS === 'ios'}
        behavior="padding"
        style={{ flex: 1 }}
      >
        <Content ref={scrollToView}>
          <ProviderCardAvatar source={avatar}>
            <ProviderCardName>
              <ProviderCardNameText>{name}</ProviderCardNameText>
            </ProviderCardName>
          </ProviderCardAvatar>

          <ProviderCardNote>
            <ProviderCardRating>
              <ProviderCardRatingText>{provider.stars}</ProviderCardRatingText>
              <ProviderCardRatingIcon />
            </ProviderCardRating>

            <ProviderCardTreatments>
              <ProviderCardTreatmentsText>
                {provider.treatments}
              </ProviderCardTreatmentsText>
              <ProviderCardTreatmentsIcon />
            </ProviderCardTreatments>

            <ProviderCardFrendleeTop />
          </ProviderCardNote>

          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            enabled={Platform.OS === 'ios'}
          >
            <Block>
              <ProviderCardFormation>
                <ProviderCardFormationText>
                  {provider.formation}
                </ProviderCardFormationText>
              </ProviderCardFormation>

              <ProviderCardStuffs>
                {provider &&
                  provider.stuffs &&
                  provider.stuffs.map((stuff, index) => {
                    const last = provider.stuffs.length === index + 1;

                    return (
                      <TouchableWithoutFeedback key={`stuff-key-${stuff.id}`}>
                        <ProviderCardStuff id={stuff.id} last={last} />
                      </TouchableWithoutFeedback>
                    );
                  })}
              </ProviderCardStuffs>

              <ProviderCardBiography>
                <ProviderCardBiographyText>
                  {description}
                </ProviderCardBiographyText>
              </ProviderCardBiography>

              <ProviderCardInfo>
                <ProviderCardInfoAge>
                  <ProviderCardInfoAgeIcon />
                  <ProviderCardInfoAgeText>{age}</ProviderCardInfoAgeText>
                </ProviderCardInfoAge>

                <ProviderCardInfoGender>
                  <ProviderCardInfoGenderIcon />
                  <ProviderCardInfoGenderText>
                    {provider.gender}
                  </ProviderCardInfoGenderText>
                </ProviderCardInfoGender>
              </ProviderCardInfo>

              <ProviderCardClock>
                <ProviderCardClockIcon />
                <ProviderCardClockInfo>
                  <ProviderCardClockInfoPeriodText>
                    {period}
                  </ProviderCardClockInfoPeriodText>
                  <ProviderCardClockInfoText>{clock}</ProviderCardClockInfoText>
                </ProviderCardClockInfo>
              </ProviderCardClock>

              <ProviderCardServices>
                <ProviderCardServicesTitleText>
                  Choose an activity
                </ProviderCardServicesTitleText>

                <ProviderCardServicesOptions>
                  {provider &&
                    provider.services &&
                    provider.services.map(service => (
                      <ProviderCardServicesOption
                        key={`service-key-${service.id}`}
                        onPress={() => handleServiceSelected(service.id)}
                        selected={service.id === provider_service_id}
                      >
                        <ProviderCardServicesOptionTextBlock>
                          <ProviderCardServicesOptionText
                            selected={service.id === provider_service_id}
                          >
                            {service.name}
                          </ProviderCardServicesOptionText>
                        </ProviderCardServicesOptionTextBlock>
                        <ProviderCardServicesOptionValueBlock
                          selected={service.id === provider_service_id}
                        >
                          <ProviderCardServicesOptionValue
                            selected={service.id === provider_service_id}
                          >
                            {`$${service.service_value.value}`}
                          </ProviderCardServicesOptionValue>
                        </ProviderCardServicesOptionValueBlock>
                      </ProviderCardServicesOption>
                    ))}
                </ProviderCardServicesOptions>
              </ProviderCardServices>

              <ProviderCardServicesSubTitleText>
                Values per hour
              </ProviderCardServicesSubTitleText>

              <ProviderCardServicesDescription>
                <ProviderCardServicesTitleText>
                  Observation
                </ProviderCardServicesTitleText>
                <Input
                  maxLength={255}
                  multiline
                  numberOfLines={4}
                  onChangeText={setObservation}
                  value={observation}
                />

                <ProviderCardServicesSubTitleText>
                  {observationLength}
                </ProviderCardServicesSubTitleText>
              </ProviderCardServicesDescription>

              <ProviderCardDateTimeDuration
                onLayout={event => setY(event.nativeEvent.layout.y)}
              >
                <ProviderCardServicesTitleText>
                  Activity location
                </ProviderCardServicesTitleText>

                <InputGooglePlaces
                  editable={!checked}
                  listViewDisplayed={focused}
                  location={location}
                  onPress={e => {
                    setAddress(e.description);
                    setFocused(false);
                  }}
                  textInputProps={{
                    onBlur: () => setFocused(false),
                    onFocus: () => setFocused(true),
                  }}
                />

                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                >
                  <View>
                    <TermsCheckBox
                      checked={checked}
                      onPress={() => setChecked(!checked)}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: '#585175',
                        fontSize: 16,
                        fontWeight: 'normal',
                        left: -5,
                        top: -1,
                      }}
                    >
                      In my address.
                    </Text>
                  </View>
                </View>

                <ProviderCardServicesTitleText>
                  Activity date
                </ProviderCardServicesTitleText>

                <InputDatePicker onDateChange={setDate} date={date} />
                <ProviderCardServicesTitleText>
                  Duration
                </ProviderCardServicesTitleText>
                <View style={{ flexDirection: 'row' }}>
                  <Input2
                    editable={false}
                    onChangeText={setDuration}
                    value={`${duration} ${duration === 1 ? `hour` : `hours`}`}
                  />
                  <View
                    style={{
                      alignItems: 'center',
                      backgroundColor: '#888',
                      borderBottomRightRadius: 5,
                      borderTopRightRadius: 5,
                      elevation: 1.1,
                      height: 48,
                      justifyContent: 'space-between',
                      left: -50,
                      top: 10,
                      width: 50,
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => handeDuration('up')}
                      style={{
                        alignItems: 'center',
                        backgroundColor: '#cdcdcd',
                        borderTopRightRadius: 5,
                        height: 23,
                        justifyContent: 'center',
                        width: 50,
                      }}
                    >
                      <FontAwesome color="#888" name="chevron-up" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => handeDuration('down')}
                      style={{
                        alignItems: 'center',
                        backgroundColor: '#cdcdcd',
                        borderBottomRightRadius: 5,
                        height: 23,
                        justifyContent: 'center',
                        width: 50,
                      }}
                    >
                      <FontAwesome color="#888" name="chevron-down" />
                    </TouchableOpacity>
                  </View>
                </View>
              </ProviderCardDateTimeDuration>

              {renderCustomerParents()}

              <ProviderCardSubmit>
                <ProviderCardSubmitButton
                  state={buttonState}
                  onPress={handleSubmit}
                >
                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    <ProviderCardSubmitButtonText>
                      SEND REQUEST
                    </ProviderCardSubmitButtonText>
                  )}
                </ProviderCardSubmitButton>
              </ProviderCardSubmit>
            </Block>
          </TouchableWithoutFeedback>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
