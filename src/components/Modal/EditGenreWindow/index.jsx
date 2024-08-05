import React from 'react';
import styles from './EditGenreWindow.module.scss';
import genresStore from '../../../store/genresStore';
import { useNavigate } from 'react-router-dom';

const EditGenreWindow = ({ onClick, onCancel }) => {
  const genre = genresStore((state) => state.genre);
  const fetchUpdateGenre = genresStore((state) => state.fetchUpdateGenre);
  const error = genresStore((state) => state.error);
  const navigate = useNavigate();

  const [newTitle, setNewTitle] = React.useState('');

  const onChange = (e) => {
    setNewTitle(e.target.value);
  };

  const onClickChange = () => {
    if (genre._id) {
      if (newTitle.length > 2) {
        fetchUpdateGenre(genre._id, newTitle);
        navigate('/genre/list');
      } else {
        alert('Too short GENRE title');
      }
    } else {
      alert('GENRE not chosen !');
    }
  };

  // console.log('newTitle', newTitle);

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <span onClick={onCancel} className={styles.close}>
            &times;
          </span>
          <h2>Enter new title of GENRE</h2>
        </div>
        <div className={styles.modalBody}>
          <div>
            <span>Genre ID:</span>
            <strong>{genre?._id}</strong>
          </div>
          <hr />
          <div>
            <label>Current TITLE:</label>
            <span>{genre?.name}</span>
          </div>
          <div>
            <span>New TITLE:</span> <input onChange={onChange} value={newTitle} />
          </div>
          {error && (
            <div>
              <span>ERROR</span> <span>{error}</span>
            </div>
          )}
        </div>
        <div className={styles.modalFooter}>
          <button onClick={onClickChange}>Change</button>
        </div>
      </div>
    </div>
  );
};

export default EditGenreWindow;
