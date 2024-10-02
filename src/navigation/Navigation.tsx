import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { navigationRef } from 'utils/NavigationUtil';
import SplashScreen from 'screens/SplashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN_KEY } from 'constants/screenKeys';
import { IBookingParams } from 'service/NavigationParams';
import HomeScreen from 'screens/homeScreen/HomeScreen';
import BookingScreen from 'screens/bookingScreen/BookingScreen';

export interface MainParamList extends Record<string, object | undefined> {
  //* ************************************ Common screens ************************************* *//
  [SCREEN_KEY.SPLASH_SCREEN]: undefined;

  [SCREEN_KEY.HOME_SCREEN]: undefined;
  [SCREEN_KEY.BOOKING_SCREEN]: IBookingParams;
}

const Stack = createNativeStackNavigator<MainParamList>();

const Navigation = () => (
  <NavigationContainer ref={navigationRef}>
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Stack.Screen component={SplashScreen} name={SCREEN_KEY.SPLASH_SCREEN} />
      <Stack.Screen name={SCREEN_KEY.HOME_SCREEN} component={HomeScreen} options={{ headerShown: false, lazy: true }} />
      <Stack.Screen
        name={SCREEN_KEY.BOOKING_SCREEN}
        component={BookingScreen}
        options={{ headerShown: false, lazy: true }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
