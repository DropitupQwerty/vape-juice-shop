import {
  Box,
  Button,
  Dialog,
  FormControl,
  FormGroup,
  OutlinedInput,
} from '@mui/material';
import React, { useState } from 'react';
import DrawerAppBar from './../components/navbar';

export default function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const { email, password } = login;

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    console.log('submitted');
  };

  return (
    <div>
      <DrawerAppBar />
      <div style={{ padding: '40px', width: '400px' }}>
        <Box component="form" onSubmit={handelSubmit}>
          <FormGroup>
            <FormControl>
              <OutlinedInput
                placeholder="Username"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <OutlinedInput
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <Button type="submit">Login</Button>
            </FormControl>
          </FormGroup>
        </Box>
      </div>
    </div>
  );
}
