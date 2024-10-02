import { Image, StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';

import { Movie } from 'data/movieData';

const MovieItemView = ({ item }: Movie) => (
  <View style={styles.movieItem}>
    <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
    <View style={styles.movieDetails}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  movieItem: {
    flexDirection: 'row',
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
  movieDetails: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
  },
});
export default memo(MovieItemView);
