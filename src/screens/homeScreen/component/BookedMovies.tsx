import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import MovieItemView from 'components/ui/MovieItemView';

const BookedMovies: React.FC = () => {
  const bookedMovies = useSelector((state: RootState) => state.movies.booked);

  return (
    <FlatList
      data={bookedMovies}
      renderItem={({ item }) => <MovieItemView item={item} />}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<Text style={styles.emptyText}>Chưa có danh sách phim đang đặt</Text>}
    />
  );
};

const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
    paddingTop: 16,
  },
});
export default BookedMovies;
