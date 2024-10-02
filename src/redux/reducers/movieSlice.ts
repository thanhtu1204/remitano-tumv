import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch, RootState } from 'redux/store';
import { Movie } from 'data/movieData';

interface MovieState {
  movies: Movie[];
  favorites: Movie[];
  booked: Movie[];
}

const initialState: MovieState = {
  movies: [],
  favorites: [],
  booked: [],
};

// Define a constant key for AsyncStorage
const MOVIES_STORAGE_KEY = 'movies_storage';

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<Movie[]>) {
      state.movies = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<Movie>) {
      const movie = action.payload;
      const index = state.favorites.findIndex((fav) => fav.id === movie.id);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.unshift(movie);
      }
    },
    bookMovie(state, action: PayloadAction<Movie>) {
      const movie = action.payload;
      if (movie) {
        state.booked.unshift(movie);
      }
    },
    loadStateFromStorage(state, action: PayloadAction<Movie[]>) {
      state.movies = action.payload;
    },
  },
});

export const { setMovies, toggleFavorite, bookMovie, loadStateFromStorage } = movieSlice.actions;

export const loadMoviesFromStorage = () => async (dispatch: AppDispatch) => {
  try {
    const savedState = await AsyncStorage.getItem(MOVIES_STORAGE_KEY);
    if (savedState) {
      dispatch(loadStateFromStorage(JSON.parse(savedState)));
    }
  } catch (error) {
    console.error('Failed to load movies from storage:', error);
  }
};

export const saveMoviesToStorage = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const { movies } = getState().movies;
    await AsyncStorage.setItem(MOVIES_STORAGE_KEY, JSON.stringify(movies));
  } catch (error) {
    console.error('Failed to save movies to storage:', error);
  }
};

export default movieSlice.reducer;
