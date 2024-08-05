import React from 'react';
import styles from './../Bar.module.scss';
import BarItem from '../BarItem';
import { menuLabels, urls } from './../../../utils/menuItems';

const Dropdown = ({ dropDownItemId, dropDownItemLabel }) => {
  const [dropUrls, setDropUrls] = React.useState([]);
  const [dropped, setDropped] = React.useState(false);

  React.useEffect(() => {
    const res = urls.filter(
      (url) => url.id > (dropDownItemId - 1) * 4 && url.id <= dropDownItemId * 4,
    );
    setDropUrls(res);
  }, []);

  // console.log(dropUrls);

  return (
    <div
      className={styles.dropdown}
      onMouseEnter={() => setDropped(true)}
      onMouseLeave={() => setDropped(false)}
    >
      <button className={styles.dropbtn}>
        {dropDownItemLabel}
        <span>&#127;</span>
        {!dropped && <span>&#9660;</span>}
        {dropped && <span>&#9650;</span>}
      </button>
      <div className={styles.dropdownContent}>
        {dropUrls.length
          ? menuLabels.map((x, index) => (
              <BarItem key={index} label={x.lbl} path={dropUrls[index].to} />
            ))
          : ''}
      </div>
    </div>
  );
};

export default Dropdown;
