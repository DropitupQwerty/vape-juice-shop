import { Paper } from '@mui/material';
import React from 'react';
import DrawerAppBar from '../components/navbar';

export default function Cart() {
  return (
    <div>
      <div>
        <DrawerAppBar />
      </div>
      <div>
        <div></div>
        <div>
          <Paper sx={{ width: '200px', height: '100px' }}></Paper>
        </div>
      </div>
    </div>
  );
}
