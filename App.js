import React from 'react';
import { StatusBar, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Persistor, Store } from './src/store';
import Mobile from './src';

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

export default function Index() {
  return (
    <Provider store={Store}>
      <PersistGate persistor={Persistor}>
        <StatusBar barStyle="dark-content" />
        <Mobile />
      </PersistGate>
    </Provider>
  );
}
