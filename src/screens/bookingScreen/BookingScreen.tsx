import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import { Movie } from 'data/movieData';
import { navigate } from 'utils/NavigationUtil';
import { bookMovie } from 'redux/reducers/movieSlice';
import { store } from 'redux/store';
import { SCREEN_KEY } from 'constants/screenKeys';
import MovieDetail from 'screens/homeScreen/component/MovieDetail';

const BookingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const route = useRoute<RouteProp<{ params: { movie: Movie } }, 'params'>>();
  const movie = route.params?.movie;

  const handleBook = () => {
    store.dispatch(bookMovie(movie));
    navigate(SCREEN_KEY.HOME_SCREEN, { tabIndex: 2 }).then((r) => {});
  };

  return (
    <View style={styles.container}>
      <MovieDetail movie={movie} onBook={handleBook} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default BookingScreen;
