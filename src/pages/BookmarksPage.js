import React, { useState, useEffect } from 'react';
import '../styles.css';

import { useDispatch, useSelector } from 'react-redux';
import { removeBookmark } from '../redux/actions/bookmarkActions';

const BookmarksPage = () => {
    const [bookmarks, setBookmarks] = useState([]);
  const dispatch = useDispatch();
  

  

  useEffect(() => {
    
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(savedBookmarks);
  }, []);

  const handleUnbookmark = (index) => {
    dispatch(removeBookmark(index));
    
    const updatedBookmarks = [...bookmarks];
    updatedBookmarks.splice(index, 1);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Bookmarks</h1>
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <ul style={styles.list}>
          {bookmarks.map((bookmark, index) => (
            <li key={index} style={styles.listItem}>
              <div style={styles.quoteBox}>
                <p style={styles.quote}>{bookmark.content}</p>
                {bookmark.author && <p style={styles.author}>- {bookmark.author}</p>}
              </div>
              <div style={styles.unbookmarkContainer} onClick={() => handleUnbookmark(index)}>
                🚫
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f4f4f4',
  },
  heading: {
    fontSize: '2em',
    color: '#333',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: '20px 0',
  },
  listItem: {
    fontSize: '1.2em',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  quoteBox: {
    border: '1px solid #3498db',
    borderRadius: '10px',
    padding: '20px',
    flex: '1',
    backgroundColor: '#fff',
    marginRight: '10px', // Add margin to separate the quote box and unbookmark symbol
  },
  quote: {
    fontSize: '1.5em',
    fontStyle: 'italic',
    color: '#555',
    margin: 0,
  },
  author: {
    fontSize: '1em',
    color: '#777',
    marginTop: '10px',
  },
  unbookmarkContainer: {
    fontSize: '1.5em',
    cursor: 'pointer',
  },
};

export default BookmarksPage;
