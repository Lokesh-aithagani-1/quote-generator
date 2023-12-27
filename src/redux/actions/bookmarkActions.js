// bookmarkActions.js
export const addBookmark = (bookmark) => ({
    type: 'ADD_BOOKMARK',
    payload: bookmark,
  });
  
  export const removeBookmark = (index) => ({
    type: 'REMOVE_BOOKMARK',
    payload: index,
  });
  