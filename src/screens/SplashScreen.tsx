import React, { FC, useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { prepareNavigation, resetAndNavigate } from 'utils/NavigationUtil';

import logo from 'assets/images/logog.png';
import { SCREEN_KEY } from 'constants/screenKeys';

const SplashScreen: FC = () => {
  useEffect(() => {
    prepareNavigation();
    setTimeout(() => {
      resetAndNavigate(SCREEN_KEY.HOME_SCREEN);
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          testID="logo-image"
          source={logo}
          style={[
            {
              width: '50%',
              height: '30%',
              resizeMode: 'contain',
            },
          ]}
        />
      </View>
      <View style={{ marginBottom: 40 }}>
        <ActivityIndicator size="large" testID="loading-indicator" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
