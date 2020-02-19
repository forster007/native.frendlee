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
  Alert,
  Keyboard,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';

import api from '~/services/api';
import { Header } from '~/components';
import {
  Block,
  Container,
  Content,
  Input,
  Input2,
  InputDatePicker,
  InputGooglePlaces,
  ProviderCardAvatar,
  ProviderCardBiography,
  ProviderCardBiographyText,
  ProviderCardClock,
  ProviderCardClockIcon,
  ProviderCardClockInfo,
  ProviderCardClockInfoPeriodText,
  ProviderCardClockInfoText,
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
  ProviderCardTreatments,
  ProviderCardTreatmentsIcon,
  ProviderCardTreatmentsText,
  TermsCheckBox,
} from './styles';

export default function ProviderDetail({ navigation }) {
  const scrollToView = useRef();

  const [provider, setProvider] = useState({});
  const [activityDate, setActivityDate] = useState(
    moment()
      .add(1, 'day')
      .format('YYYY-MM-DD 08:00')
  );
  const [age, setAge] = useState('');
  const [avatar, setAvatar] = useState({});
  const [checked, setChecked] = useState(false);
  const [description, setDescription] = useState('');
  const [focused, setFocused] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [serviceSelected, setServiceSelected] = useState();

  const id = useMemo(() => navigation.getParam('id'), [navigation]);

  const handleLocation = useCallback(async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('Warn!', 'We need access.');
    }

    const { coords } = await Location.getCurrentPositionAsync({});
    setLocation(`${coords.latitude},${coords.longitude}`);
  });

  const handleProviders = useCallback(async () => {
    const { data } = await api.get(`/providers/${id}`);

    setProvider(data);
    setServiceSelected(data.services[0].id);
  });

  const handleServiceSelected = useCallback(
    serviceId => {
      setServiceSelected(serviceId);
    },
    [serviceSelected]
  );

  useEffect(() => {
    handleProviders();

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
    if (isKeyboardVisible) {
      scrollToView.current.scrollToEnd();
    }
  }, [isKeyboardVisible]);

  useEffect(() => {
    setAge(`${moment().diff(provider.birthdate, 'years')} years old`);
    setAvatar({ uri: provider.picture_profile_url });
    setName(`${provider.name} ${provider.lastname}`);
  }, [provider]);

  return (
    <Container>
      <Header left="goBack" right="none" title={name || 'Loading Frendlee'} />

      <Content onContentSizeChange={() => {}} ref={scrollToView}>
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
                  <ProviderCardStuff
                    key={`stuff-key-${stuff.id}`}
                    id={stuff.id}
                    last={last}
                  />
                );
              })}
          </ProviderCardStuffs>

          <ProviderCardBiography>
            <ProviderCardBiographyText>
              Nascido em uma família de judeus alemães, mudou-se para a Suíça
              ainda jovem e iniciou seus estudos na Escola Politécnica de
              Zurique. Após dois anos procurando emprego, obteve um cargo no
              escritório de patentes suíço enquanto ingressava no curso de
              doutorado da Universidade de Zurique.
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
                Dias de semana
              </ProviderCardClockInfoPeriodText>
              <ProviderCardClockInfoText>
                Horáro comercial
              </ProviderCardClockInfoText>
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
                    key={`service-${service.id}`}
                    onPress={() => handleServiceSelected(service.id)}
                    selected={service.id === serviceSelected}
                  >
                    <ProviderCardServicesOptionTextBlock>
                      <ProviderCardServicesOptionText
                        selected={service.id === serviceSelected}
                      >
                        {service.name}
                      </ProviderCardServicesOptionText>
                    </ProviderCardServicesOptionTextBlock>
                    <ProviderCardServicesOptionValueBlock
                      selected={service.id === serviceSelected}
                    >
                      <ProviderCardServicesOptionValue
                        selected={service.id === serviceSelected}
                      >
                        {`$${service.service_value.value}`}
                      </ProviderCardServicesOptionValue>
                    </ProviderCardServicesOptionValueBlock>
                  </ProviderCardServicesOption>
                ))}
            </ProviderCardServicesOptions>

            <ProviderCardServicesSubTitleText>
              Values per hour
            </ProviderCardServicesSubTitleText>

            <ProviderCardServicesDescription>
              <ProviderCardServicesTitleText>
                Observation
              </ProviderCardServicesTitleText>
              <Input
                multiline
                numberOfLines={4}
                onChangeText={setDescription}
                value={description}
              />
            </ProviderCardServicesDescription>

            <ProviderCardServicesDescription>
              <ProviderCardServicesTitleText>
                Activity location
              </ProviderCardServicesTitleText>

              <InputGooglePlaces
                listViewDisplayed={focused}
                location={location}
                onPress={() => setFocused(false)}
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
                Activity date and time
              </ProviderCardServicesTitleText>

              <InputDatePicker
                onDateChange={setActivityDate}
                date={activityDate}
              />

              <ProviderCardServicesTitleText>
                Activity duration
              </ProviderCardServicesTitleText>
              <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                <Input2 onChangeText={setDescription} value={description} />
                <View
                  style={{
                    alignItems: 'center',
                    backgroundColor: '#888',
                    borderBottomRightRadius: 5,
                    borderTopRightRadius: 5,
                    height: 48,
                    justifyContent: 'space-between',
                    left: -50,
                    top: 10,
                    width: 50,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.7}
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
            </ProviderCardServicesDescription>
          </ProviderCardServices>
        </Block>
      </Content>
    </Container>
  );
}
