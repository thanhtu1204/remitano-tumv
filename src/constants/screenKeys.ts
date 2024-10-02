export const SCREEN_KEY = {
  SPLASH_SCREEN: 'SplashScreen',
  HOME_SCREEN: 'HomeScreen',
  BOOKING_SCREEN: 'BookingScreen',
} as const;

export type ScreenKey = (typeof SCREEN_KEY)[keyof typeof SCREEN_KEY];
