import React, { memo, useMemo, useRef } from 'react';
import { Button, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState, store } from 'redux/store';
import { toggleFavorite } from 'redux/reducers/movieSlice';
import { Movie } from 'data/movieData';
import ImageLoader from 'components/global/ImageLoader';
import { navigate } from 'utils/NavigationUtil';
import { SCREEN_KEY } from 'constants/screenKeys';

const MovieItem = memo(({ item, index }: { item: Movie; index: number }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const favoriteMovies = useSelector((state: RootState) => state.movies.favorites);
  const bookedMovies = useSelector((state: RootState) => state.movies.booked);
  const isFavorite = useMemo(() => favoriteMovies.some((movie) => movie.id === item.id), [favoriteMovies, item.id]);
  const isBooked = useMemo(() => bookedMovies.some((movie) => movie.id === item.id), [bookedMovies, item.id]);

  const handleLikePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.5,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      store.dispatch(toggleFavorite(item));
    });
  };

  return (
    <Animated.View style={[styles.movieItem]}>
      <ImageLoader
        thumbnailSource={item.thumbnail ? { uri: item.thumbnail } : undefined}
        source={{ uri: item.thumbnail }}
        style={styles.thumbnail}
      />
      <Animated.View style={styles.movieDetails}>
        <Animated.Text style={styles.title}>{item.title}</Animated.Text>
        <Animated.Text>{item.description}</Animated.Text>

        <Animated.View style={styles.buttonContainer}>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <TouchableOpacity
              style={{ ...styles.button, borderColor: isFavorite ? '#f194ff' : 'gray' }}
              onPress={handleLikePress}
              testID={`favorite-button-${index}`}
            >
              <Animated.Text style={[styles.textFavorite, { color: isFavorite ? '#f194ff' : 'gray' }]}>
                Yêu thích
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            style={[styles.button, { marginLeft: 16, borderColor: isBooked ? 'gray' : '#2aec0f' }]}
            onPress={() => {
              if (!isBooked) {
                navigate(SCREEN_KEY.BOOKING_SCREEN, { movie: item }).then((r) => {});
              }
            }}
            disabled={isBooked}
          >
            <Animated.Text style={{ ...styles.textFavorite, color: isBooked ? 'gray' : '#2aec0f' }}>
              {isBooked ? 'Đã xem' : 'Đặt vé'}
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  movieItem: {
    marginHorizontal: 16,
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  thumbnail: {
    width: 100,
    height: 100,
    margin: 8,
    borderRadius: 4,
  },
  movieDetails: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textFavorite: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginLeft: 12,
    fontWeight: 'bold',
    borderRadius: 4,
    padding: 12,
    borderWidth: 1,
    borderColor: '#adadad',
    backgroundColor: '#FFFFFF',
  },
});

export default MovieItem;
