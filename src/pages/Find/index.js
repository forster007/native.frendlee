import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components';

import { providersRequest } from '../../store/modules/providers/actions';

import {
  Container,
  Content,
  Empty,
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
} from './styles';

export default function Find({ navigation }) {
  const dispatch = useDispatch();
  const { loading, providers } = useSelector(state => state.providers);
  const [selected, setSelected] = useState(new Map());

  const handleProviders = useCallback(() => {
    dispatch(providersRequest());
  });

  const handleSelected = useCallback(id => {
    const newSelected = new Map(selected);
    newSelected.set(id, !selected.get(id));

    setSelected(newSelected);
  });

  useEffect(() => {
    handleProviders();
  }, []);

  function renderProviders({ item: provider }) {
    const avatar = { uri: provider.picture_profile_url };
    const name = `${provider.name} ${provider.lastname}`;
    const { formation, id, services, stars, treatments } = provider;
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
          <ProviderCard expanded={false} onPress={() => handleSelected(id)}>
            <ProviderCardShort>
              <ProviderCardShortBody>
                <ProviderProfile>
                  <ProviderCardShortAvatar source={avatar} />
                  <ProviderProfileInfo>
                    <ProviderName>{name}</ProviderName>
                    <ProviderTreatments>
                      {`${treatments} treatments`}
                    </ProviderTreatments>
                  </ProviderProfileInfo>
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
            </ProviderCardShort>
          </ProviderCard>
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
