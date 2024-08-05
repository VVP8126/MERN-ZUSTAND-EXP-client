import React from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './../../styles/styles.module.scss';
import AuthorDetails from '../../components/ItemDetails/AuthorDetails';
import BookDetails from '../../components/ItemDetails/BookDetails';
import GenreDetails from '../../components/ItemDetails/GenreDetails';
import InstanceDetails from '../../components/ItemDetails/InstanceDetails';
import Loader from '../../components/Loader';

import { items } from '../../utils/menuItems';

const Item = () => {
  const id = useParams();
  const location = useLocation();
  const [item, setItem] = React.useState(null);

  React.useEffect(() => {
    const parsedPathname = location.pathname.split('/');
    setItem(parsedPathname[parsedPathname.length - 2]);
  }, [location.pathname]);

  return (
    <div className={styles.container}>
      {item === items[0].lbl ? (
        <BookDetails bookId={id.id} />
      ) : item === items[1].lbl ? (
        <AuthorDetails authorId={id.id} />
      ) : item === items[2].lbl ? (
        <GenreDetails genreId={id.id} />
      ) : item === items[3].lbl ? (
        <InstanceDetails instanceId={id.id} />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Item;
