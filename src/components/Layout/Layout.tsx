import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './Layout.css';
import Controls from '../Controls/Controls';

function Layout() {
  return (
    <div className="layout">
      <Header />
      <Outlet />
      <Footer />
      <Controls />
    </div>
  );
}

export default Layout;
