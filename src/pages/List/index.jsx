import React from 'react';
import { useLocation } from 'react-router-dom';
import { items } from '../../utils/menuItems';
import Books from '../../components/ItemsList/Books';
import Authors from '../../components/ItemsList/Authors';
import Genres from '../../components/ItemsList/Genres';
import BookInstances from '../../components/ItemsList/BookInstances';
import styles from '../../styles/styles.module.scss';
import Loader from '../../components/Loader';

const List = () => {
  const location = useLocation();
  const [item, setItem] = React.useState(null);

  React.useEffect(() => {
    const parsedPathname = location.pathname.split('/');
    setItem(parsedPathname[parsedPathname.length - 2]);
  }, [location.pathname]);

  return (
    <div className={styles.container}>
      {item === items[0].lbl ? (
        <Books />
      ) : item === items[1].lbl ? (
        <Authors />
      ) : item === items[2].lbl ? (
        <Genres />
      ) : item === items[3].lbl ? (
        <BookInstances />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default List;
