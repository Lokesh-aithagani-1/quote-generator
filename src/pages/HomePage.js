// HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addBookmark } from '../redux/actions/bookmarkActions';
import '../styles.css';

const HomePage = () => {
  const [quoteData, setQuoteData] = useState({});
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchRandomQuote();
    fetchTags();

    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(savedBookmarks);
  }, []);

  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      setQuoteData(response.data);
    } catch (error) {
      console.error('Error fetching random quote:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/tags');
      setTags(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleGenerateQuote = () => {
    fetchRandomQuote();
  };

  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  const handleTagQuote = async () => {
    try {
      const response = await axios.get(`https://api.quotable.io/random?tag=${selectedTag}`);
      setQuoteData(response.data);
    } catch (error) {
      console.error('Error fetching tagged quote:', error);
    }
  };

  const handleBookmark = () => {
    if (quoteData.content) {
      dispatch(addBookmark(quoteData));
      const updatedBookmarks = [...bookmarks, quoteData];
      setBookmarks(updatedBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Quote Generator</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleGenerateQuote}>
          Generate Quote
        </button>
      </div>
      <div style={styles.tagContainer}>
        <select style={styles.select} onChange={handleTagChange} value={selectedTag}>
          <option value="">Select Tag</option>
          {tags.map((tag) => (
            <option key={tag._id} value={tag.slug}>
              {tag.name}
            </option>
          ))}
        </select>
        <button style={styles.button} onClick={handleTagQuote}>
          Get Tagged Quote
        </button>
      </div>
      <div style={styles.quoteContainer}>
        <div style={styles.quoteBox}>
          <p style={styles.quote}>{quoteData.content}</p>
          {quoteData.author && <p style={styles.author}>- {quoteData.author}</p>}
        </div>
        <div style={styles.bookmarkContainer} onClick={handleBookmark}>
          📌
        </div>
      </div>
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
  buttonContainer: {
    margin: '20px 0',
  },
  button: {
    padding: '10px',
    fontSize: '1em',
    margin: '0 10px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  tagContainer: {
    margin: '20px 0',
  },
  select: {
    padding: '10px',
    fontSize: '1em',
  },
  quoteContainer: {
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteBox: {
    border: '1px solid #3498db',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#fff',
    position: 'relative',
    maxWidth: '600px', 
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
  bookmarkContainer: {
    marginLeft: '10px', 
    fontSize: '1.5em',
    cursor: 'pointer',
  },
};

export default HomePage;
