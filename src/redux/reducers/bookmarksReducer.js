// bookmarksReducer.js
const initialState = {
    bookmarks: [],
  };
  
  const bookmarksReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_BOOKMARK':
        return {
          ...state,
          bookmarks: [...state.bookmarks, action.payload],
        };
  
      case 'REMOVE_BOOKMARK':
        return {
          ...state,
          bookmarks: state.bookmarks.filter((_, index) => index !== action.payload),
        };
  
      default:
        return state;
    }
  };
  
  export default bookmarksReducer;
  