import React, { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import api from '~/services/api';
import { Header } from '~/components';
import {
  Block,
  Container,
  Content,
  Input,
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
  ProviderCardServicesDescription2,
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
} from './styles';

export default function ProviderDetail({ navigation }) {
  const [provider, setProvider] = useState({});
  const [age, setAge] = useState('');
  const [avatar, setAvatar] = useState({});
  const [description, setDescription] = useState('');
  const [focused, setFocused] = useState(false);
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [serviceSelected, setServiceSelected] = useState();

  const id = useMemo(() => navigation.getParam('id'), [navigation]);

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
  }, []);

  useEffect(() => {
    setAge(`${moment().diff(provider.birthdate, 'years')} years old`);
    setAvatar({ uri: provider.picture_profile_url });
    setName(`${provider.name} ${provider.lastname}`);
  }, [provider]);

  return (
    <Container>
      <Header left="goBack" right="none" title={name || 'Loading Frendlee'} />

      <Content>
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

            <ProviderCardServicesDescription2>
              <ProviderCardServicesTitleText>
                Activity Location
              </ProviderCardServicesTitleText>
              <GooglePlacesAutocomplete
                autoFocus={false}
                placeholder="Search"
                minLength={2}
                returnKeyType="search"
                onPress={e => setPlace(e.description)}
                query={{
                  key: 'AIzaSyAFJIPPAEdmSCSFw9BxBR3HHJH8youwCic',
                  language: 'pt',
                }}
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={300}
                textInputProps={{
                  multiline: true,
                  numberOfLines: 2,
                  value: place,
                  onChangeText: e => {
                    console.log(e);
                    setPlace(e);
                  },
                  onFocus: () => setFocused(true),
                  onBlur: () => setFocused(false),
                  autoCapitalize: 'none',
                  autoCorrect: false,
                }}
              />
            </ProviderCardServicesDescription2>

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
          </ProviderCardServices>
        </Block>
      </Content>
    </Container>
  );
}
