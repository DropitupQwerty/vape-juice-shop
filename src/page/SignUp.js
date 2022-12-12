import {
  Box,
  Button,
  Dialog,
  FormControl,
  FormGroup,
  FormHelperText,
  IconButton,
  OutlinedInput,
  Paper,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import global from '../styles/global';
import DrawerAppBar from './../components/navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../service/firebase-config';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from './../service/firebase-config';

export default function SignUp() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const { email, password, firstname, lastname, contact, username } = login;

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handelSubmit = (e) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        console.log(userCredential);
        const user = userCredential.user;

        await setDoc(doc(db, `users/${user?.uid}`), {
          ...login,
        }).then(() => {
          sessionStorage.setItem('USER', JSON.stringify(user));
          navigate('/shop');
        });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    e.preventDefault();

    console.log('submitted');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        postion: 'relative',
      }}
    >
      <IconButton
        sx={{ position: 'absolute', top: '20px', left: '20px', color: 'white' }}
        component={Link}
        to="/shop"
      >
        <ArrowBackIcon sx={{ fontSize: '40px' }} />
        Back
      </IconButton>
      <Typography
        sx={{
          color: 'white',
          marginBottom: '20px',
          letterSpacing: '10px',
          right: '20px',
        }}
        variant="h6"
        fontWeight={700}
      >
        Vape Ph and Manufacturing
      </Typography>
      <Paper style={{ padding: '30px', width: '400px' }}>
        <Typography textAlign="center" fontWeight="bold">
          CREATE AN ACCOUNT
        </Typography>
        <Box component="form" onSubmit={handelSubmit}>
          <FormGroup>
            <FormControl>
              <OutlinedInput
                sx={{ ...global.addForm }}
                placeholder="First Name"
                name="firstname"
                value={firstname}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl>
              <OutlinedInput
                sx={{ ...global.addForm }}
                placeholder="Last name"
                name="lastname"
                value={lastname}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl>
              <OutlinedInput
                sx={{ ...global.addForm }}
                placeholder="Contact Number"
                name="contact"
                value={contact}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl>
              <OutlinedInput
                sx={{ ...global.addForm }}
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
                type="email"
                required
              />
            </FormControl>
            <FormControl>
              <OutlinedInput
                sx={{ ...global.addForm }}
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl>
              <OutlinedInput
                sx={{ ...global.addForm }}
                placeholder="Password"
                name="password"
                value={password}
                type="password"
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl sx={{ ...global.addForm }}>
              <Button variant="contained" type="submit">
                CREATE ACCOUNT
              </Button>

              <FormHelperText>
                By clicking "Continue", you agree to our Terms and confirm
                you're 18 years or older.
              </FormHelperText>
            </FormControl>
            <Typography sx={{ fonstSize: '40px', textAlign: 'center' }}>
              Already have an account?
              <span style={{ margin: '0 5px' }}>
                <Link to="/login">Sign In</Link>
              </span>
            </Typography>
          </FormGroup>
        </Box>
      </Paper>
    </Box>
  );
}
