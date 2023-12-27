// index.js
import { createStore, combineReducers } from 'redux';
import bookmarksReducer from '../reducers/bookmarksReducer';

const rootReducer = combineReducers({
  bookmarks: bookmarksReducer,
  
});

const store = createStore(rootReducer);

export default store;
