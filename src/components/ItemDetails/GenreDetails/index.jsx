import React from 'react';
import styles from './GenreDetails.module.scss';
import Loader from '../../Loader';
import st from '../../../styles/styles.module.scss';
import genresStore from '../../../store/genresStore';
import booksStore from '../../../store/booksStore';
import { NavLink } from 'react-router-dom';

const GenreDetails = ({ genreId }) => {
  const genre = genresStore((state) => state.genre);
  const loading = genresStore((state) => state.isLoading);
  const error = genresStore((state) => state.error);
  const fetchGenreDetails = genresStore((state) => state.fetchGenreDetails);

  const books = booksStore((state) => state.books);
  const booksLoading = booksStore((state) => state.isLoading);
  const bookLoadingError = booksStore((state) => state.error);
  const fetchBooksByGenre = booksStore((state) => state.fetchBooksByGenre);

  React.useEffect(() => {
    fetchGenreDetails(genreId);
    fetchBooksByGenre(genreId);
  }, []);

  return loading || booksLoading ? (
    <div className={st.loading}>
      <h3>Loading...</h3>
      <center>
        <Loader />
      </center>
    </div>
  ) : error.length || bookLoadingError ? (
    <div className={st.error}>
      {error && <h4 className={st.centered}>{error}</h4>}
      {bookLoadingError && <h4 className={st.centered}>{bookLoadingError}</h4>}
      <p>Try find this information later</p>
      <span>&#9785;</span>
    </div>
  ) : (
    <>
      <h2>
        <span>Genre ID:</span>&#127;<span>{genreId}</span>
      </h2>
      <h1 className={styles.title}>GENRE: {genre?.name}</h1>
      <h4>{genre?.name} books in Catalog:</h4>
      <div>
        {books.map((book) => (
          <div key={book._id} className={styles.book}>
            <NavLink className={styles.strong} to={`/book/${book?._id}`}>
              {book.title}
            </NavLink>
            <div>
              <em>by</em>&#127;
              <NavLink to={`/author/${book?.author?._id}`}>
                {book?.author?.firstName} {book?.author?.familyName}
              </NavLink>
            </div>
            <p className={styles.rightAligned}>ISBN: {book?.isbn}</p>
          </div>
        ))}
      </div>
      <h4 className={styles.justified}>
        <span>Found {genre?.name} in Catalog:</span> <span>{books.length}</span>
      </h4>
    </>
  );
};

export default GenreDetails;
