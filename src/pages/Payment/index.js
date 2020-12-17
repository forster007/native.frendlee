import React, { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { updateAppointments } from '../../services/appointments';
import { storePayment } from '../../services/payment';
import { Header } from '../../components';
import {
  ButtonSubmit,
  ButtonSubmitText,
  Card,
  CardBody,
  Credit,
  Container,
  Content,
  Input,
  InputBlock,
  InputCreditCard,
  InputDate,
  InputLabel,
} from './styles';

export default function Payment({ navigation }) {
  const [cvc, setCvc] = useState('');
  const [expiry, setExpiry] = useState('');
  const [expiryRaw, setExpiryRaw] = useState('');
  const [focused, setFocused] = useState('name');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [numberRaw, setNumberRaw] = useState('');
  const [buttonState, setButtonState] = useState(false);
  const [loading, setLoading] = useState(false);

  const appointment = useMemo(() => navigation.getParam('appointment'), [
    navigation,
  ]);

  const today = useMemo(() => moment().format('MMYY'));

  const handleSubmit = useCallback(async () => {
    setButtonState(false);
    setLoading(true);

    const stripe = require('stripe-client')(
      'pk_test_5ozzXcwRmPpfh1nhCEsgBpFl00d042bAHN'
    );
    const [exp_month, exp_year] = expiry.split('/');
    const card = {
      number: numberRaw,
      exp_month,
      exp_year,
      cvc,
      name,
    };

    const token = await stripe.createToken({ card });

    if (Object.prototype.hasOwnProperty.call(token, 'error')) {
      Alert.alert('OPS...', token.error.message);
      setButtonState(true);
      setLoading(false);
    } else {
      try {
        const transactionResponse = await storePayment({
          appointment_id: appointment.id,
          token: token.id,
        });

        if (
          transactionResponse &&
          transactionResponse.data &&
          transactionResponse.data.status
        ) {
          await updateAppointments({
            appointment_id: appointment.id,
            status: 'payed',
          });

          Alert.alert(
            'SUCCESS',
            'Appointment payed successfully.',
            [{ text: 'Ok', onPress: () => navigation.navigate('Schedule') }],
            { cancelable: false }
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  useEffect(() => {
    if (
      cvc.length === 3 &&
      expiry &&
      expiryRaw.length === 4 &&
      moment(expiryRaw, 'MMYY').isAfter(today, 'MMYY') &&
      name &&
      number &&
      numberRaw.length === 16
    ) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [cvc, expiry, expiryRaw, number, numberRaw, name]);

  function renderContent() {
    return (
      <>
        <Card>
          <CardBody>
            <Credit
              cvc={cvc}
              expiry={expiryRaw}
              focused={focused}
              name={name}
              number={numberRaw}
            />

            <InputBlock>
              <InputLabel>Card number</InputLabel>
              <InputCreditCard
                includeRawValueInChangeText
                keyboardType="numeric"
                maxLength={19}
                onChangeText={(e, f) => {
                  setNumber(e);
                  setNumberRaw(f.join(''));
                }}
                onFocus={() => setFocused('number')}
                value={number}
              />
            </InputBlock>

            <InputBlock>
              <InputLabel>Full name</InputLabel>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={19}
                onChangeText={e => setName(e)}
                onFocus={() => setFocused('name')}
                value={name}
              />
            </InputBlock>

            <InputBlock direction="row">
              <InputBlock width="48%">
                <InputLabel>CVC</InputLabel>
                <Input
                  keyboardType="numeric"
                  maxLength={3}
                  onChangeText={e => setCvc(e)}
                  onFocus={() => setFocused('cvc')}
                  value={cvc}
                />
              </InputBlock>

              <InputBlock width="48%">
                <InputLabel>Valid thru</InputLabel>
                <InputDate
                  maxLength={5}
                  onChangeText={e => {
                    setExpiry(e);
                    setExpiryRaw(e.replace('/', ''));
                  }}
                  onFocus={() => setFocused('expiry')}
                  returnKeyType="next"
                  value={expiry}
                />
              </InputBlock>
            </InputBlock>

            <InputBlock>
              <ButtonSubmit onPress={handleSubmit} state={buttonState}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <ButtonSubmitText>SEND REQUEST</ButtonSubmitText>
                )}
              </ButtonSubmit>
            </InputBlock>
          </CardBody>
        </Card>
      </>
    );
  }

  return (
    <Container>
      <Header
        titleAlign="left"
        left="goBack"
        right="none"
        subtitle={`${appointment.detail.service.name} - $${appointment.value}`}
        title="Pay Appointment"
      />
      <KeyboardAvoidingView
        enabled={Platform.OS === 'ios'}
        behavior="padding"
        style={{ flex: 1 }}
      >
        <Content>{renderContent()}</Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
