import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Movie } from 'data/movieData';
import ImageLoader from 'components/global/ImageLoader';
import CustomSafeAreaScrollView from 'components/global/CustomSafeAreaViewScroll';

interface MovieDetailProps {
  movie: Movie;
  onBook: () => void;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie, onBook }) => {
  if (!movie) {
    return (
      <View style={styles.mainEmpty}>
        <Text style={styles.title}>Hãy chọn bộ phim hay nhất và đặt nào</Text>
      </View>
    );
  }

  return (
    <CustomSafeAreaScrollView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ImageLoader
          thumbnailSource={movie.thumbnail ? { uri: movie.thumbnail } : undefined}
          source={{ uri: movie?.thumbnail ?? '' }}
          style={styles.thumbnail}
          resizeMode="contain"
        />
        <Text style={styles.title}>{movie?.title}</Text>
        <Text>{movie?.description}</Text>
      </View>
      <TouchableOpacity style={styles.btnBookContainer} onPress={onBook}>
        <Text style={styles.btnBookText}>Đặt Vé</Text>
      </TouchableOpacity>
    </CustomSafeAreaScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  thumbnail: {
    width: '100%',
    height: 250,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  btnBookContainer: {
    backgroundColor: 'green',
    borderRadius: 4,
  },
  btnBookText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    paddingVertical: 16,
  },
  mainEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textEmpty: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    paddingVertical: 16,
  },
});

export default MovieDetail;
