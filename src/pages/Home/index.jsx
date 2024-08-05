import React from 'react';
import styles from './../../styles/styles.module.scss';
import authorsStore from './../../store/authorsStore';
import booksStore from './../../store/booksStore';
import genresStore from './../../store/genresStore';
import instancesStore from './../../store/instancesStore';
import st from './Home.module.scss';
import Loader from '../../components/Loader';

const Home = () => {
  const authorsCount = authorsStore((state) => state.count);
  const authorsLoading = authorsStore((state) => state.isLoading);
  const authorsLoadError = authorsStore((state) => state.error);
  const fetchAuthorsCount = authorsStore((state) => state.fetchAuthorsCount);

  const booksCount = booksStore((state) => state.count);
  const booksLoading = booksStore((state) => state.isLoading);
  const booksLoadError = booksStore((state) => state.error);
  const fetchBooksCount = booksStore((state) => state.fetchBooksCount);

  const genresCount = genresStore((state) => state.count);
  const genresLoading = genresStore((state) => state.isLoading);
  const genresLoadError = genresStore((state) => state.error);
  const fetchGenresCount = genresStore((state) => state.fetchGenresCount);

  const instancesCount = instancesStore((state) => state.count);
  const instancesLoading = instancesStore((state) => state.isLoading);
  const instancesLoadError = instancesStore((state) => state.error);
  const fetchInstancesCount = instancesStore((state) => state.fetchInstancesCount);

  React.useEffect(() => {
    fetchAuthorsCount();
    fetchBooksCount();
    fetchGenresCount();
    fetchInstancesCount();
  }, []);

  // console.log(`Authors load Error: ${authorsLoadError}`);

  return (
    <div className={styles.container}>
      <center>
        <h1>Library catalog summary</h1>
      </center>
      <table className={st.table}>
        <tbody>
          <tr className={st.row}>
            <th className={st.col}>Category</th>
            <th className={st.col}>Count</th>
          </tr>
          <tr className={st.row}>
            <td className={st.col}>Authors</td>
            <td className={st.col}>
              {authorsLoading ? <Loader /> : authorsLoadError ? 'Not found' : authorsCount}
            </td>
          </tr>
          <tr className={st.row}>
            <td className={st.col}>Genres</td>
            <td className={st.col}>
              {genresLoading ? <Loader /> : genresLoadError ? 'Not found' : genresCount}
            </td>
          </tr>
          <tr className={st.row}>
            <td className={st.col}>Books</td>
            <td className={st.col}>
              {booksLoading ? <Loader /> : booksLoadError ? 'Not found' : booksCount}
            </td>
          </tr>
          <tr className={st.row}>
            <td className={st.col}>Book Instances</td>
            <td className={st.col}>
              {instancesLoading ? <Loader /> : instancesLoadError ? 'Not found' : instancesCount}
            </td>
          </tr>
        </tbody>
      </table>
      {authorsLoadError && (
        <p className={styles.centered}>
          <strong>
            <em>{authorsLoadError}</em>
          </strong>
        </p>
      )}
      {booksLoadError && (
        <p className={styles.centered}>
          <strong>
            <em>{booksLoadError}</em>
          </strong>
        </p>
      )}
      {genresLoadError && (
        <p className={styles.centered}>
          <strong>
            <em>{genresLoadError}</em>
          </strong>
        </p>
      )}
      {instancesLoadError && (
        <p className={styles.centered}>
          <strong>
            <em>{instancesLoadError}</em>
          </strong>
        </p>
      )}
    </div>
  );
};

export default Home;
