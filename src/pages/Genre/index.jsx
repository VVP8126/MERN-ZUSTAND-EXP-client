import React from 'react';
import stls from './../../styles/styles.module.scss';
import styles from './Genre.module.scss';
import genresStore from '../../store/genresStore';
import Loader from '../../components/Loader';

const Genre = () => {
  const genre = genresStore((state) => state.genre);
  const genres = genresStore((state) => state.genres);
  const loading = genresStore((state) => state.isLoading);
  const error = genresStore((state) => state.error);
  const fetchGenresList = genresStore((state) => state.fetchGenresList);
  const fetchCreateGenre = genresStore((state) => state.fetchCreateGenre);

  const [showGenreList, setShowGenreList] = React.useState(false);
  const [name, setName] = React.useState('');

  const getList = () => {
    fetchGenresList();
    setShowGenreList(true);
  };

  const onChangeTxt = (e) => {
    setName(e.target.value);
  };

  const onClickBtn = async (e) => {
    e.preventDefault();
    await fetchCreateGenre(name);
    setShowGenreList(false);
  };

  return (
    <div className={stls.container}>
      <h2 className={styles.head}>
        Create new <em>genre</em>
      </h2>
      <form className={styles.form}>
        <input
          className={styles.name}
          type="text"
          placeholder="Enter Genre name"
          value={name}
          onChange={onChangeTxt}
        />
        <button disabled={!Boolean(name)} onClick={onClickBtn} className={styles.submit}>
          create
        </button>
      </form>
      {error ? (
        <p className={stls.centered}>{error}</p>
      ) : genre?._id ? (
        <p className={styles.successInfo}>
          Created new GENRE: <strong>{genre?.name}</strong>
        </p>
      ) : (
        ''
      )}
      <h3>Genres in Base:</h3>
      <button className={styles.getListBtn} onClick={getList}>
        Show Genres in Base
      </button>
      {showGenreList ? (
        loading ? (
          <Loader />
        ) : (
          <div className={styles.genresBlock}>
            {genres.map((genre) => (
              <span key={genre._id}>{genre.name.toUpperCase()}</span>
            ))}
          </div>
        )
      ) : (
        <p>Press button to get a list of Genres</p>
      )}
    </div>
  );
};

export default Genre;
