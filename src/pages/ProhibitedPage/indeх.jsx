import React from 'react';
import st from '../../styles/styles.module.scss';
import styles from './ProhibitedPage.module.scss';

const ProhibitedPage = () => {
  return (
    <div className={`${st.container} ${styles.prohibited}`}>
      <p>403</p>
      <span> </span>
      <b>access denied</b>
    </div>
  );
};

export default ProhibitedPage;
