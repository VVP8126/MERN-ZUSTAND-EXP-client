import React from 'react';
import st from '../../styles/styles.module.scss';
import styles from './Error.module.scss';

const Error = () => {
  return (
    <div className={st.container}>
      <div className={styles.errorBlock}>
        <h1>PAGE</h1>
        <h1>not found</h1>
        <p className={styles.lbl404}>404</p>
      </div>
    </div>
  );
};

export default Error;
