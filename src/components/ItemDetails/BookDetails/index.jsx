import React from 'react';
import { NavLink } from 'react-router-dom';
import booksStore from '../../../store/booksStore';
import instancesStore from '../../../store/instancesStore';
import Loader from '../../Loader';

import styles from './BookDetails.module.scss';
import st from '../../../styles/styles.module.scss';
import format from '../../../utils/dateFormatter';

const BookDetails = ({ bookId }) => {
  const book = booksStore((state) => state.book);
  const bookLoading = booksStore((state) => state.isLoading);
  const bookLoadingError = booksStore((state) => state.error);
  const fetchBookById = booksStore((state) => state.fetchBookById);

  const instances = instancesStore((state) => state.instances);
  const instancesLoading = instancesStore((state) => state.isLoading);
  const instancesLoadingError = instancesStore((state) => state.error);
  const fetchInstancesByBook = instancesStore((state) => state.fetchInstancesByBook);

  React.useEffect(() => {
    fetchBookById(bookId);
    fetchInstancesByBook(bookId);
  }, []);

  // console.log(book);

  return bookLoading || instancesLoading ? (
    <div className={st.loading}>
      <h3>Loading...</h3>
      <center>
        <Loader />
      </center>
    </div>
  ) : bookLoadingError || instancesLoadingError ? (
    <div className={st.error}>
      {bookLoadingError && <h4 className={st.centered}>{bookLoadingError}</h4>}
      {instancesLoadingError && <h4 className={st.centered}>{instancesLoadingError}</h4>}
      <p>Try find this information later</p>
      <span>&#9785;</span>
    </div>
  ) : (
    <>
      <h2 className={styles.head}>
        <span>Book ID:</span>&#127;<span>{bookId}</span>
      </h2>
      <h4>Detailed BOOK information:</h4>
      <p className={styles.title}>{book?.title}</p>
      <div className={styles.authorBlock}>
        <div>Author:</div>
        <NavLink to={`/author/${book?.author?._id}`}>
          {book?.author?.familyName}, {book?.author?.firstName}
        </NavLink>
      </div>
      <div className={styles.additionalInfo}>
        <div className={styles.isbn}>
          <span>
            <strong>ISBN:</strong>
          </span>
          <span>{book?.isbn}</span>{' '}
        </div>
        <div className={styles.genres}>
          <div>GENRES:</div>
          <div className={styles.genreList}>
            {book?.genre?.map((genre) => (
              <NavLink key={genre._id} to={`/genre/${genre._id}`} title={`See all ${genre.name}s`}>
                {genre.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.summary}>
        <p>summary</p>
        <em>{book?.summary}</em>
      </div>
      <div className={styles.bookInstanceBlock}>
        <p className={styles.statInfo}>Instances status information</p>
        {instances.map((instance) => (
          <div key={instance._id}>
            <p className={styles.justified}>
              <span>ID:</span>
              <NavLink to={`/book_instance/${instance._id}`} title={`Book instance info ...`}>
                {instance._id}
              </NavLink>{' '}
            </p>
            <p className={styles.justified}>
              <span>IMPRINT:</span>
              <span>{instance.imprint}</span>{' '}
            </p>
            <p className={styles.justified}>
              <span>STATUS:</span>
              <span>{instance.status}</span>{' '}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default BookDetails;
