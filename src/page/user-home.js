import React from 'react';
import DialogAge from '../components/dialog18';
import ResponsiveDrawer from '../components/navbar';
import Sales from '../components/sales';
import { getSales } from '../fakeapi/sale';
import '../styles/styles.css';

export default function UserHomepage() {
  return (
    <div>
      <DialogAge />
      <div className="nav-container">
        <ResponsiveDrawer />
      </div>
      <div className="header-container">
        <div className="banner"></div>
        <div className="content-container">
          <Sales />
        </div>
      </div>
    </div>
  );
}
