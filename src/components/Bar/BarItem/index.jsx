import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './../Bar.module.scss';

const BarItem = ({ path, label }) => {
  return (
    <NavLink
      className={({ isActive }) => `${styles.barItem} ${isActive ? styles.activeItem : ''}`}
      to={path}
    >
      {label}
    </NavLink>
  );
};
export default BarItem;
