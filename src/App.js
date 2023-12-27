// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import HomePage from './pages/HomePage';
import BookmarksPage from './pages/BookmarksPage';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div style={styles.container}>
          <nav style={styles.navbar}>
            <ul style={styles.navList}>
              <li style={styles.navItem}>
                <Link to="/" style={styles.navLink}>
                  Home
                </Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/bookmarks" style={styles.navLink}>
                  Bookmarks
                </Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
  },
  navbar: {
    backgroundColor: '#3498db',
    padding: '10px',
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  navList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
  },
  navItem: {
    marginRight: '20px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '1.2em',
  },
};

export default App;
