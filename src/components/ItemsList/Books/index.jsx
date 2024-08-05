import React from 'react';
import { NavLink } from 'react-router-dom';

import Loader from '../../Loader';
import booksStore from '../../../store/booksStore';
import st from '../../../styles/styles.module.scss';
import styles from './Books.module.scss';

const Books = () => {
  const booksList = booksStore((state) => state.books);
  const booksLoading = booksStore((state) => state.isLoading);
  const booksLoadError = booksStore((state) => state.error);
  const fetchBooksList = booksStore((state) => state.fetchBooksList);

  React.useEffect(() => {
    fetchBooksList();
  }, []);

  return booksLoading ? (
    <div className={st.loading}>
      <h3>Loading...</h3>
      <center>
        <Loader />
      </center>
    </div>
  ) : booksLoadError.length ? (
    <div className={styles.error}>
      <p>{booksLoadError}</p>
      <p>Try find this information later</p>
      <span>&#9785;</span>
    </div>
  ) : (
    <>
      <h1 className={st.centered}>List of Books found in Catalog</h1>
      <div className={styles.listSummary}>
        <span>Found Books:</span>
        <span>
          <strong>
            <em>{booksList.length}</em>
          </strong>
        </span>
      </div>
      {booksList.map((book) => (
        <div className={styles.booksList} key={book._id}>
          <NavLink to={`/book/${book._id}`} title="Details...">
            {' '}
            {book.title}{' '}
          </NavLink>
          <NavLink to={`/author/${book?.author?._id}`} title="See Author's books...">
            <em>by</em>&#127;
            <strong>
              {book?.author?.firstName}&#127;{book?.author?.familyName}
            </strong>
          </NavLink>
        </div>
      ))}
    </>
  );
};

export default Books;
