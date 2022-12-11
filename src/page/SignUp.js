import { FormControl, OutlinedInput, Paper, Typography } from '@mui/material';
import React from 'react';
import global from '../styles/global';
import DrawerAppBar from './../components/navbar';

export default function SignUp() {
  return (
    <div>
      <div>
        <DrawerAppBar />
      </div>
      <div className="sign-up">
        <Paper sx={{ height: '600px', width: '500px' }} elevation={4}>
          <div>
            <Typography
              variant="h4"
              sx={{ textAlign: 'center', margin: '10px 0' }}
            >
              Register
            </Typography>
          </div>

          <div style={{ display: 'flex' }}>
            <FormControl sx={{ ...global.addForm }}>
              <Typography>First name: </Typography>
              <OutlinedInput />
            </FormControl>
            <FormControl sx={{ ...global.addForm }}>
              <Typography>Last name </Typography>
              <OutlinedInput />
            </FormControl>
          </div>
        </Paper>
      </div>
    </div>
  );
}
