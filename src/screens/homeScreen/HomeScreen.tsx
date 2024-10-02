import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { store } from 'redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useRoute } from '@react-navigation/native';

import { loadStateFromStorage, setMovies } from 'redux/reducers/movieSlice';
import { moviesData } from 'data/movieData';
import MovieList from 'screens/homeScreen/component/MovieList';
import FavoriteMovies from 'screens/homeScreen/component/FavoriteMovies';
import BookedMovies from 'screens/homeScreen/component/BookedMovies';

const initialLayout = { width: 300 };
const MOVIES_STORAGE_KEY = 'movies_storage';

const renderScene = SceneMap({
  movies: MovieList,
  favorites: FavoriteMovies,
  booked: BookedMovies,
});

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const route = useRoute<RouteProp<{ params: { tabIndex?: number } }, 'params'>>();
  const tabIndex = route.params?.tabIndex ?? 0;
  const isFirstRender = useRef(true);

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'movies', title: 'Phim' },
    { key: 'favorites', title: 'Yêu Thích' },
    { key: 'booked', title: 'Đang Đặt' },
  ]);

  const memoizedSceneMap = useMemo(() => renderScene, []);

  useEffect(() => {
    if (isFirstRender.current) {
      setIndex(tabIndex);
      isFirstRender.current = false;
    }
  }, [tabIndex]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const updatedTabIndex = route.params?.tabIndex;
      if (updatedTabIndex !== undefined) {
        setIndex(updatedTabIndex);
      }
    });
    return unsubscribe;
  }, [navigation, route.params?.tabIndex]);

  useEffect(() => {
    const initializeData = async () => {
      const savedState = await AsyncStorage.getItem(MOVIES_STORAGE_KEY);
      if (savedState) {
        const movies = JSON.parse(savedState);
        store.dispatch(loadStateFromStorage(movies));
      } else {
        const initialMovies = moviesData;
        store.dispatch(setMovies(initialMovies));
        await AsyncStorage.setItem(MOVIES_STORAGE_KEY, JSON.stringify(initialMovies));
      }
    };

    initializeData();
  }, [store.dispatch]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={memoizedSceneMap}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={(props) => (
            <TabBar {...props} style={styles.tabBar} indicatorStyle={styles.indicator} labelStyle={styles.label} />
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#ffffff',
  },
  indicator: {
    backgroundColor: '#6200ee',
  },
  label: {
    fontWeight: 'bold',
    color: '#6200ee',
  },
});

export default HomeScreen;
