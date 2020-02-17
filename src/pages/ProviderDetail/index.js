import React, { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';

import api from '~/services/api';
import { Header } from '~/components';
import {
  Container,
  Content,
  ProviderCardAvatar,
  ProviderCardBiography,
  ProviderCardBiographyText,
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
  ProviderCardTreatments,
  ProviderCardTreatmentsIcon,
  ProviderCardTreatmentsText,
} from './styles';

export default function ProviderDetail({ navigation }) {
  const [provider, setProvider] = useState({});
  const [age, setAge] = useState('');
  const [avatar, setAvatar] = useState({});
  const [name, setName] = useState('');

  const id = useMemo(() => navigation.getParam('id'), [navigation]);

  const handleProviders = useCallback(async () => {
    const { data } = await api.get(`/providers/${id}`);
    setProvider(data);
  });

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

        <ProviderCardFormation>
          <ProviderCardFormationText>
            {provider.formation}
          </ProviderCardFormationText>
        </ProviderCardFormation>

        <ProviderCardBiography>
          <ProviderCardBiographyText>
            Short biography of Frendlee, explaining a little who he is, and what
            he wants, with a maximum of 4 lines of text, or a character limit,
            type 255.
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
      </Content>
    </Container>
  );
}
