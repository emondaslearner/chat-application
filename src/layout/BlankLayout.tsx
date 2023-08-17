// ** React Imports
import React from 'react';
import { Outlet } from 'react-router-dom';

interface BlankLayoutProps {}

const BlankLayout: React.FC<BlankLayoutProps> = () => {
    console.log('blank layout is running')
  return <Outlet />;
}

export default BlankLayout;
