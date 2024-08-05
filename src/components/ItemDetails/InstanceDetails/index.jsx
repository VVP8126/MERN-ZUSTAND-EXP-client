import React from 'react';
import { NavLink } from 'react-router-dom';
import instancesStore from '../../../store/instancesStore';
import Loader from '../../Loader';

import styles from './BookInstanceDetails.module.scss';
import st from '../../../styles/styles.module.scss';
import format from '../../../utils/dateFormatter';

const InstanceDetails = ({ instanceId }) => {
  const instance = instancesStore((state) => state.instance);
  const loading = instancesStore((state) => state.isLoading);
  const error = instancesStore((state) => state.error);
  const fetchInstanceById = instancesStore((state) => state.fetchInstanceById);

  React.useEffect(() => {
    fetchInstanceById(instanceId);
  }, []);

  console.log('Book Instance:', instance);

  return loading ? (
    <div className={st.loading}>
      <h3>Loading...</h3>
      <center>
        <Loader />
      </center>
    </div>
  ) : error.length ? (
    <div className={st.error}>
      {error && <h4 className={st.centered}>{error}</h4>}
      <p>Try find this information later</p>
      <span>&#9785;</span>
    </div>
  ) : (
    <>
      <h2>
        <span>Instance ID:</span>&#127;<span>{instanceId}</span>
      </h2>
      <h4>Detailed information about Book Instance:</h4>
      <div className={styles.main}>
        <p className={styles.head}>{instance?.book?.title}</p>
        <div className={styles.summary}>{instance?.book?.summary}</div>
        <div className={styles.isbn}>ISBN: {instance?.book?.isbn}</div>
        <div className={styles.imprint}>
          <span>IMPRINT:</span> <span>{instance?.imprint}</span>
        </div>
        <div className={styles.status}>
          <span>STATUS:</span>
          <span>{instance?.status}</span>
        </div>
        <div className={styles.availableFrom}>
          Available on: {instance?.dueBack ? format(instance?.dueBack) : <span>Right now</span>}
        </div>
      </div>
    </>
  );
};

export default InstanceDetails;
