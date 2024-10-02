import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

import MovieItemView from 'screens/homeScreen/component/MovieItemView';

const FavoriteMovies: React.FC = () => {
  const favoriteMovies = useSelector((state: RootState) => state.movies.favorites);

  return (
    <FlatList
      data={favoriteMovies}
      renderItem={({ item }) => <MovieItemView item={item} />}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<Text style={styles.emptyText}>Chưa có phim yêu thích nào.</Text>}
    />
  );
};

const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
    paddingTop: 16,
  },
});
export default FavoriteMovies;
