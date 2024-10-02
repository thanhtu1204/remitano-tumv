import { combineReducers } from 'redux';
import movieReducer from './reducers/movieSlice';

const rootReducer = combineReducers({
  movies: movieReducer,
});

export default rootReducer;
