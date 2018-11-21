import React, { Component}  from 'react';
import Header from './components/Header/Header'
const Layout = ({ children }) => (
  <div>
    <Header />
      {children}
  </div>
);

export default Layout;
