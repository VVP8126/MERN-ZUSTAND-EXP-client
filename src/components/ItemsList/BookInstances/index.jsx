import React from 'react';
import instancesStore from '../../../store/instancesStore';
import Loader from '../../Loader';
import { NavLink } from 'react-router-dom';
import format from '../../../utils/dateFormatter';
import st from '../../../styles/styles.module.scss';
import styles from './BookInstances.module.scss';

const BookInstances = () => {
  const instancesList = instancesStore((state) => state.instances);
  const loading = instancesStore((state) => state.isLoading);
  const error = instancesStore((state) => state.error);
  const fetchInstancesList = instancesStore((state) => state.fetchInstancesList);

  React.useEffect(() => {
    fetchInstancesList();
  }, []);

  // console.log(instancesList);

  return loading ? (
    <div className={st.loading}>
      <h3>Loading...</h3>
      <center>
        <Loader />
      </center>
    </div>
  ) : error ? (
    <div className={st.error}>
      <p>{error}</p>
      <p>Try find this information later</p>
      <span>&#9785;</span>
    </div>
  ) : (
    <div>
      <h2 className={st.centered}>Book Instances</h2>
      <div className={styles.totalBlock}>
        <span>Available info on</span>
        <span>
          <strong>
            <em>{instancesList.length}</em>
          </strong>{' '}
          books
        </span>
      </div>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.thead}>
            <th className={styles.col}>Book Title</th>
            <th className={styles.col}>Author ID</th>
            <th className={styles.col}>ISBN</th>
            <th className={styles.col}>Imprint</th>
            <th className={styles.col}>Status</th>
            <th className={styles.col}>Available from</th>
          </tr>
          {instancesList.map((instance) => (
            <tr key={instance?._id} className={styles.row}>
              <td className={`${styles.col} ${styles.smallFont}`}>
                <NavLink to={`/book_instance/${instance?._id}`}>{instance?.book?.title}</NavLink>
              </td>
              <td className={styles.col}>
                <NavLink to={`/author/${instance?.book?.author}`}>{instance?.book?.author}</NavLink>
              </td>
              <td className={styles.col}>{instance?.book?.isbn}</td>
              <td className={styles.col}>{instance?.imprint}</td>
              <td className={styles.col}>{instance?.status}</td>
              <td className={styles.col}>
                {instance?.dueBack ? format(instance?.dueBack) : <em>Today</em>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookInstances;
