import React from 'react';
import { NavLink } from 'react-router-dom';
import genresStore from '../../../store/genresStore';
import Loader from '../../Loader';
import st from '../../../styles/styles.module.scss';
import styles from './Genres.module.scss';

const Genres = () => {
  const genresList = genresStore((state) => state.genres);
  const genresLoading = genresStore((state) => state.isLoading);
  const genresLoadError = genresStore((state) => state.error);
  const fetchGenresList = genresStore((state) => state.fetchGenresList);

  React.useEffect(() => {
    fetchGenresList();
  }, []);

  return genresLoading ? (
    <div className={st.loading}>
      <h3>Loading...</h3>
      <center>
        <Loader />
      </center>
    </div>
  ) : genresLoadError ? (
    <div className={st.error}>
      <p>{genresLoadError}</p>
      <p>Try find this information later</p>
      <span>&#9785;</span>
    </div>
  ) : (
    <div className={styles.genresBlock}>
      <h1 className={st.centered}>Books' Genres</h1>
      <div className={styles.genres}>
        {genresList.map((genre) => (
          <div key={genre._id} className={styles.genre}>
            <NavLink to={`/genre/${genre._id}`}> {genre.name.toUpperCase()}</NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genres;
