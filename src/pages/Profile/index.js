import React, { useCallback, useEffect, useState } from 'react';
import { Share, Text, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import { Header } from '~/components';
import moment from 'moment';
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
  ProfileCardBiography,
  ProfileCardBiographyText,
  ProfileCardBiographyTitle,
  ProfileCardInformation,
  ProfileCardInformationText,
  ProfileCardInformationSsnIcon,
  ProfileCardInformationEmailIcon,
  ProfileCardInfo,
  ProfileCardInfoAge,
  ProfileCardInfoAgeIcon,
  ProfileCardInfoAgeText,
  ProfileCardInfoGender,
  ProfileCardInfoGenderIconFemale,
  ProfileCardInfoGenderIconMale,
  ProfileCardInfoGenderText,
  ProfileCardInfoPhone,
  ProfileCardInfoPhoneIcon,
  ProfileCardInfoPhoneText,
  ProfileCardInfoWhatsapp,
  ProfileCardInfoWhatsappIcon,
  ProfileCardInfoWhatsappText,
  ProfileCardInfoMedical,
  ProfileCardInfoMedicalTitle,
  ProfileCardInfoMedicalItem,
  ProfileCardInfoMedicalItemIcon,
  ProfileCardInfoMedicalItemText,
  DivisorInfo,
  ProfileCardInfoMedicalFlatList
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
  const [email, setEmail] = useState('');
  const [medicalInformation, setMedicalInformation] = useState([]);
  const [ssn, setSsn] = useState('');
  const [gender, setGender] = useState('');
  const [biography, setBiography] = useState('');
  const [age, setAge] = useState('');
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
        console.log(response.data);
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
    console.log('user profile -> ' + JSON.stringify(profile.user));
    setSsn(profile.ssn);
    setGender(profile.gender);
    setAge(`${moment().diff(profile.birthdate, 'years')} years old`);
    setMedicalInformation([
      `Pressure ${profile.blood_pressure}`,
      ...profile.have_allergy ? ['I have allergy'] : [],
      ...profile.have_treatment ? ['I am in a medical treatment'] : [],
      ...profile.have_diseases ? ['I have diseases'] : []
    ]);
    // setEmail(profile.user.email);
    // setBiography(profile.biography);
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

  function renderMedicalInfoItem({ item }) {
    return <ProfileCardInfoMedicalItem>
      <ProfileCardInfoMedicalItemIcon />
      <ProfileCardInfoMedicalItemText>{item}</ProfileCardInfoMedicalItemText>
    </ProfileCardInfoMedicalItem>;
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

            <DivisorInfo />

            <ProfileCardBiography>
              <ProfileCardBiographyTitle>Biography</ProfileCardBiographyTitle>
              <ProfileCardBiographyText>
                Blue bottle crucifix banh mi, echo park bicycle rights godard YOLO XOXO hella hashtag green juice narwhal PBR&B. Freegan woke cliche, vaporware locavore shabby chic copper mug butcher pabst seitan cold-pressed. Hella sustainable viral church-key helvetica.
                {biography}
              </ProfileCardBiographyText>
            </ProfileCardBiography>

            <ProfileCardInformation>
              <ProfileCardInformationSsnIcon />
              <ProfileCardInformationText>{ssn}</ProfileCardInformationText>
            </ProfileCardInformation>

            <ProfileCardInformation>
              <ProfileCardInformationEmailIcon />
              <ProfileCardInformationText>delmar.jr.furtado@gmail.com{email}</ProfileCardInformationText>
            </ProfileCardInformation>

            <ProfileCardInfo>
              <ProfileCardInfoPhone>
                <ProfileCardInfoPhoneIcon />
                <ProfileCardInfoPhoneText>{profile.phone_number}</ProfileCardInfoPhoneText>
              </ProfileCardInfoPhone>

              <ProfileCardInfoWhatsapp>
                <ProfileCardInfoWhatsappIcon />
                <ProfileCardInfoWhatsappText>Whatsapp</ProfileCardInfoWhatsappText>
              </ProfileCardInfoWhatsapp>
            </ProfileCardInfo>

            <ProfileCardInfo>
              <ProfileCardInfoAge>
                <ProfileCardInfoAgeIcon />
                <ProfileCardInfoAgeText>{age}</ProfileCardInfoAgeText>
              </ProfileCardInfoAge>

              <ProfileCardInfoGender>
                {gender === 'female' ? <ProfileCardInfoGenderIconFemale gender={gender} /> : <ProfileCardInfoGenderIconMale />}
                <ProfileCardInfoGenderText>
                  {gender}
                </ProfileCardInfoGenderText>
              </ProfileCardInfoGender>
            </ProfileCardInfo>

            <ProfileCardInfoMedical>
              <ProfileCardInfoMedicalTitle>Medical information</ProfileCardInfoMedicalTitle>

              <ProfileCardInfoMedicalFlatList
                data={medicalInformation}
                keyExtractor={item => item}
                renderItem={renderMedicalInfoItem}
                ListEmptyComponent={<Div />} />
            </ProfileCardInfoMedical>

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
