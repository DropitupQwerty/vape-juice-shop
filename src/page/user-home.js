import React from 'react';
import ResponsiveDrawer from '../components/navbar';
import Sales from '../components/sales';
import '../styles/styles.css';

export default function UserHomepage() {
  return (
    <div>
      <div className="nav-container">
        <ResponsiveDrawer />
      </div>
      <div className="banner"></div>
      <div className="header-container">
        <div className="content-container">
          <Sales />
        </div>
      </div>
    </div>
  );
}
