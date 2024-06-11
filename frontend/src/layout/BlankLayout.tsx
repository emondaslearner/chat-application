// ** React Imports
import React from 'react';
import { Outlet } from 'react-router-dom';

interface BlankLayoutProps {}

const BlankLayout: React.FC<BlankLayoutProps> = () => {
  return <Outlet />;
}

export default BlankLayout;
