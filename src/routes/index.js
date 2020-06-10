import React from 'react';
import { createAppContainer } from 'react-navigation';
import { Transition } from 'react-native-reanimated';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from '~/pages/SignIn';
import {
  SignUpStep1,
  SignUpStep2,
  SignUpStep3,
  SignUpStep4,
} from '~/pages/SignUp';

import Chat from '~/pages/Chat';
import Find from '~/pages/Find';
import Payment from '~/pages/Payment';
import ProviderDetail from '~/pages/ProviderDetail';
import Schedule from '~/pages/Schedule';
import ScheduleDetail from '~/pages/ScheduleDetail';

const SignStack = createStackNavigator(
  {
    SignIn,
    SignUp: createStackNavigator(
      {
        SignUpStep1,
        SignUpStep2,
        SignUpStep3,
        SignUpStep4,
      },
      {
        headerMode: 'none',
        initialRouteName: 'SignUpStep1',
      }
    ),
  },
  {
    headerMode: 'none',
    initialRouteName: 'SignIn',
  }
);

const AppTabs = createBottomTabNavigator(
  {
    Find,
    Schedule,
  },
  {
    tabBarOptions: {
      activeBackgroundColor: '#4c476f',
      activeTintColor: '#ffffff',
      inactiveTintColor: '#7244D4',
      style: {
        borderTopWidth: 0,
        height: 54,
        elevation: 5,
      },
      labelStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        top: -15,
      },
    },
  }
);

const AppStack = createStackNavigator(
  {
    AppTabs,
    Chat,
    Payment,
    ProviderDetail,
    ScheduleDetail,
  },
  {
    headerMode: 'none',
  }
);

export default signed =>
  createAppContainer(
    createAnimatedSwitchNavigator(
      {
        SignStack,
        AppStack,
      },
      {
        initialRouteName: signed ? 'AppStack' : 'SignStack',
        transition: (
          <Transition.Together>
            <Transition.Together>
              <Transition.Out
                type="fade"
                durationMs={200}
                interpolation="easeIn"
              />
              <Transition.In type="fade" delayMs={500} durationMs={300} />
            </Transition.Together>
          </Transition.Together>
        ),
      }
    )
  );
