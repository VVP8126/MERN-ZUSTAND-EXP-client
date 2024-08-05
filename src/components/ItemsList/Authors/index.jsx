import React from 'react';
import { NavLink } from 'react-router-dom';
import authorsStore from '../../../store/authorsStore';
import Loader from '../../Loader';
import st from '../../../styles/styles.module.scss';
import styles from './Authors.module.scss';

const Authors = () => {
  const authorsList = authorsStore((state) => state.authors);
  const loading = authorsStore((state) => state.isLoading);
  const fetchAuthorsList = authorsStore((state) => state.fetchAuthorsList);
  const loadError = authorsStore((state) => state.error);

  React.useEffect(() => {
    fetchAuthorsList();
  }, []);

  return (
    <div>
      {loading ? (
        <div className={styles.loading}>
          <h3>Loading...</h3>
          <center>
            <Loader />
          </center>
        </div>
      ) : loadError.length ? (
        <h4 className={st.centered}>{loadError}</h4>
      ) : (
        <>
          <h2 className={st.centered}>Information about Authors in a base</h2>
          <div className={styles.summary}>
            <span>Found information about:</span>
            <span className={styles.total}>{authorsList?.length} author(s)</span>
          </div>
          {authorsList?.map((author) => (
            <NavLink key={author?._id} to={`/author/${author?._id}`} className={styles.authorLink}>
              {author?.familyName}, <em>{author?.firstName}</em>
            </NavLink>
          ))}
        </>
      )}
    </div>
  );
};

export default Authors;
