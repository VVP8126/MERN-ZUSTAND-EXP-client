import React from 'react';
import genresStore from '../../../store/genresStore';
import Loader from '../../../components/Loader';
import st from '../../../styles/styles.module.scss';
import styles from './EditGenre.module.scss';
import EditGenreWindow from '../../../components/Modal/EditGenreWindow';

const EditGenre = () => {
  const genre = genresStore((state) => state.genre);
  const genres = genresStore((state) => state.genres);
  const loading = genresStore((state) => state.isLoading);
  const loadError = genresStore((state) => state.error);
  const fetchGenresList = genresStore((state) => state.fetchGenresList);
  const fetchGenreDetails = genresStore((state) => state.fetchGenreDetails);

  const [showModalBlock, setShowModalBlock] = React.useState(false);

  const onClickStart = (id) => {
    fetchGenreDetails(id);
    setShowModalBlock(true);
  };

  const onClickFinish = () => {
    setShowModalBlock(false);
  };

  const onClickCancel = () => {
    setShowModalBlock(false);
  };

  React.useEffect(() => {
    fetchGenresList();
  }, []);

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
          {showModalBlock && <EditGenreWindow onClick={onClickFinish} onCancel={onClickCancel} />}
          <h1 className={st.centered}>Click GENRE to edit</h1>
          <div className={styles.cardContainer}>
            {genres.map((genre) => (
              <div key={genre._id} className={styles.card}>
                <div className={styles.inner}>
                  <div className={styles.front}>
                    <h2>{genre.name}</h2>
                    <p>
                      <span>ID:</span>
                      <span>{genre._id}</span>{' '}
                    </p>
                  </div>
                  <div className={styles.back}>
                    <button onClick={() => onClickStart(genre._id)}>CHANGE DETAILS...</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EditGenre;
