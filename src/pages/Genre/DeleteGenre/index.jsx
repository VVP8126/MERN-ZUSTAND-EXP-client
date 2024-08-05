import React from 'react';
import { useNavigate } from 'react-router-dom';
import genresStore from '../../../store/genresStore';
import { hasGenreConstraints } from '../../../http/api/genreAPI';
import Loader from '../../../components/Loader';

import st from './../../../styles/styles.module.scss';
import styles from './DeleteGenre.module.scss';

const DeleteGenre = () => {
  const navigate = useNavigate();

  const genres = genresStore((state) => state.genres);
  const loading = genresStore((state) => state.isLoading);
  const loadError = genresStore((state) => state.error);
  const fetchGenresList = genresStore((state) => state.fetchGenresList);
  const fetchRemoveGenre = genresStore((state) => state.fetchRemoveGenre);

  React.useEffect(() => {
    fetchGenresList();
  }, []);

  const onClickRemove = async (id) => {
    const hasConstraints = await hasGenreConstraints(id);
    if (!hasConstraints) {
      await fetchRemoveGenre(id);
      navigate('/genre/list');
    } else {
      alert("GENRE has constraints. You can't delete it from a base !");
    }
  };

  return (
    <div className={st.container}>
      {loading ? (
        <div className={st.loading}>
          <h3>Loading...</h3>
          <center>
            <Loader />
          </center>
        </div>
      ) : loadError ? (
        <div className={st.error}>
          <p>{loadError}</p>
          <p>Try find this information later</p>
          <span>&#9785;</span>
        </div>
      ) : (
        <>
          <h3 className={st.centered}>
            Delete&#127;<strong>GENRE</strong>
          </h3>
          {genres.map((genre) => (
            <div className={styles.delGenreBlock} key={genre._id}>
              <span>{genre.name.toUpperCase()}</span>
              <button onClick={() => onClickRemove(genre._id)}>DELETE</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default DeleteGenre;
