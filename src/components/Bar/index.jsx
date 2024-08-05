import React from 'react';
import styles from './Bar.module.scss';
import BarItem from './BarItem';
import Dropdown from './Dropdown';
import { dropDownItems } from './../../utils/menuItems';

const Bar = () => {
  /** 
   * <BarItem path="" label="HOME" />
      <BarItem path="books" label="BOOKS" />
      <BarItem path="authors" label="AUTHORS" />
      <BarItem path="genres" label="GENRES" />
      <BarItem path="instances" label="BOOK ITEMS" />
   * 
  */

  return (
    <div className={styles.bar}>
      <BarItem path="/" label="HOME" />
      {dropDownItems.map((item, index) => (
        <Dropdown key={index} dropDownItemId={item.id} dropDownItemLabel={item.lbl} />
      ))}
    </div>
  );
};

export default Bar;
