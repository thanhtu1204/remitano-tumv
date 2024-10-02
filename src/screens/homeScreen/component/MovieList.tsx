import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from 'redux/store';
import MovieItem from 'components/ui/MovieItem';
import { Movie } from 'data/movieData';

const PAGE_SIZE = 20;

const MovieList: React.FC = () => {
  const movies = useSelector((state: RootState) => state.movies.movies);

  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const isLoading = useRef(false);

  const loadMoreMovies = useCallback(() => {
    if (isLoading.current || !hasMore) {
      return;
    }

    isLoading.current = true;

    const newMovies = movies.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    setDisplayedMovies((prevMovies) => [...prevMovies, ...newMovies]);

    if (newMovies.length < PAGE_SIZE || newMovies.length === 0) {
      setHasMore(false);
    }

    setPage((prevPage) => prevPage + 1);

    isLoading.current = false;
  }, [page, hasMore, movies]);

  useEffect(() => {
    if (movies.length > 0 && firstLoad) {
      setDisplayedMovies([]);
      setPage(1);
      setHasMore(true);
      setFirstLoad(false);
      loadMoreMovies();
    }
  }, [movies, firstLoad, loadMoreMovies]);

  return (
    <FlatList
      data={displayedMovies}
      renderItem={({ item }) => <MovieItem item={item} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      removeClippedSubviews
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={100}
      windowSize={5}
      showsVerticalScrollIndicator={false}
      onEndReached={loadMoreMovies}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isLoading.current ? <ActivityIndicator size="large" color="#0000ff" /> : null}
    />
  );
};

const styles = StyleSheet.create({
  container: { paddingBottom: 10 },
});

export default memo(MovieList);
