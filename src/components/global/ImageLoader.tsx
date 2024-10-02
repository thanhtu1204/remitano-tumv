import React, { useState } from 'react';
import { View, StyleSheet, Animated, ActivityIndicator, ImageURISource } from 'react-native';
import { Easing } from 'react-native-reanimated';
import imgDefault from 'assets/images/images.png';

interface ImageLoaderProps {
  thumbnailSource?: ImageURISource;
  source: ImageURISource;
  placeholderSource?: ImageURISource;
  style?: any;
  resizeMode?: any;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({
  thumbnailSource,
  source,
  placeholderSource = { uri: imgDefault },
  style,
  resizeMode,
}) => {
  const thumbnailAnimated = new Animated.Value(0);
  const imageAnimated = new Animated.Value(0);
  const [loading, setLoading] = useState(true);

  const handleThumbnailLoad = () => {
    setLoading(false);
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
      duration: 250,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      duration: 300,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200ee" />
        </View>
      )}

      <Animated.Image
        source={thumbnailSource || placeholderSource}
        style={[style, { opacity: thumbnailAnimated }]}
        resizeMode={resizeMode || 'cover'}
        onLoad={handleThumbnailLoad}
        blurRadius={thumbnailSource ? 1 : 0}
      />

      <Animated.Image
        source={source}
        style={[styles.imageOverlay, { opacity: imageAnimated }, style]}
        resizeMode={resizeMode || 'cover'}
        onLoad={onImageLoad}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: 1, // Ensure loading icon is above the image
  },
  imageOverlay: {
    position: 'absolute', // Ensure full-size image overlays thumbnail
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default ImageLoader;
