import React from 'react';
import { NavLink } from 'react-router-dom';
import booksStore from '../../../store/booksStore';
import authorsStore from '../../../store/authorsStore';
import Loader from '../../Loader';

import styles from './AuthorDetails.module.scss';
import st from '../../../styles/styles.module.scss';
import format from '../../../utils/dateFormatter';

const AuthorDetails = ({ authorId }) => {
  const books = booksStore((state) => state.books);
  const booksLoading = booksStore((state) => state.isLoading);
  const booksLoadingError = booksStore((state) => state.error);
  const fetchBooksByAuthor = booksStore((state) => state.fetchBooksByAuthor);

  const author = authorsStore((state) => state.author);
  const authorLoading = authorsStore((state) => state.isLoading);
  const authorLoadingError = authorsStore((state) => state.error);
  const fetchAuthorById = authorsStore((state) => state.fetchAuthorById);

  React.useEffect(() => {
    fetchBooksByAuthor(authorId);
    fetchAuthorById(authorId);
  }, []);

  // console.log('Books:', books);
  // console.log('Author:', author);

  return booksLoading || authorLoading ? (
    <div className={st.loading}>
      <h3>Loading...</h3>
      <center>
        <Loader />
      </center>
    </div>
  ) : booksLoadingError || authorLoadingError ? (
    <div className={st.error}>
      {booksLoadingError && <h4 className={st.centered}>{booksLoadingError}</h4>}
      {authorLoadingError && <h4 className={st.centered}>{authorLoadingError}</h4>}
      <p>Try find this information later</p>
      <span>&#9785;</span>
    </div>
  ) : (
    <>
      <h2>
        <span>Author ID:</span> <span>{authorId}</span>
      </h2>
      <div className={styles.authorBlock}>
        <p className={styles.authorName}>
          {author?.familyName}, {author?.firstName}
        </p>
        <p className={styles.life}>born on {format(author?.birthDate)}</p>
        {author?.deathDate && <p className={styles.life}>died on {format(author?.deathDate)}</p>}
      </div>
      <div className={styles.booksBlock}>
        <p>
          Author's <strong>BOOKs</strong>:
        </p>
        {books.map((book) => (
          <div className={styles.book} key={book._id}>
            <div className={styles.title}>
              <NavLink to={`/book/${book?._id}`}>{book?.title}</NavLink>
            </div>
            <div className={styles.isbn}>
              <span>ISBN:</span>
              <span>{book?.isbn}</span>
            </div>
            <div className={styles.genres}>
              <span>GENRES:</span>
              {book?.genre?.map((g) => (
                <span key={g._id}>{g?.name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AuthorDetails;
