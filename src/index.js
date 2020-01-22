import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import NavigationService from '~/services/navigation';
import Routes from '~/routes';

export default function App() {
  const { signed } = useSelector(
    state => state.auth,
    () => true
  );

  const RoutesWrapper = Routes(signed);

  return (
    <View style={{ flex: 1 }}>
      <RoutesWrapper
        ref={navigatorRef =>
          NavigationService.setTopLevelNavigator(navigatorRef)
        }
      />
    </View>
  );
}
