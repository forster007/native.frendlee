import React from 'react';
import { StatusBar, View } from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { useSelector } from 'react-redux';

import NavigationService from './services/navigation';
import Routes from './routes';

export default function App() {
  const { signed } = useSelector(
    state => state.auth,
    () => true
  );

  const RoutesWrapper = Routes(signed);

  return (
    <ActionSheetProvider>
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />
        <RoutesWrapper
          ref={navigatorRef =>
            NavigationService.setTopLevelNavigator(navigatorRef)
          }
        />
      </View>
    </ActionSheetProvider>
  );
}
