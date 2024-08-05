import React from 'react';
import { Outlet } from 'react-router-dom';
import Bar from '../Bar';

const SharedLayout = () => {
  // console.log('Menu loaded !');

  return (
    <div>
      <Bar />
      <Outlet />
    </div>
  );
};

export default SharedLayout;
