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
import Home from '~/pages/Home';
import Schedule from '~/pages/Schedule';
import ScheduleDetails from '~/pages/ScheduleDetails';

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
      }
    ),
  },
  {
    headerMode: 'none',
    initialRouteName: 'SignIn',
  }
);

const AppTabs = createBottomTabNavigator({
  Home,
  Schedule,
});

const AppStack = createStackNavigator(
  {
    AppTabs,
    ScheduleDetails,
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
