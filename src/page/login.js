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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../service/firebase-config';
import { getDoc, doc } from 'firebase/firestore';
import { db } from './../service/firebase-config';

export default function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const { email, password } = login;

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    console.log('submitted');
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;

        await getDoc(doc(db, `users/${user.uid}`)).then((res) => {
          console.log(res.data().role);

          if (res.data().role === 'admin') {
            sessionStorage.setItem(
              'USER',
              JSON.stringify({ ...user, role: res.data().role })
            );
          } else {
            sessionStorage.setItem(
              'USER',
              JSON.stringify({ ...user, role: 'user' })
            );
          }
        });

        navigate('/shop');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode);
      });
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
        sx={{ color: 'white', marginBottom: '20px', letterSpacing: '10px' }}
        variant="h4"
        fontWeight={700}
      >
        Vape Ph and Manufacturing
      </Typography>
      <Paper style={{ padding: '40px', width: '400px' }}>
        <Typography textAlign="center" fontWeight="bold">
          WELCOME BACK!
        </Typography>
        <Box component="form" onSubmit={handelSubmit}>
          <FormGroup>
            <FormControl>
              <OutlinedInput
                sx={{ ...global.addForm }}
                placeholder="Username"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <OutlinedInput
                sx={{ ...global.addForm }}
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
                type="password"
              />
            </FormControl>

            <FormControl sx={{ ...global.addForm }}>
              <Button variant="contained" type="submit">
                Login
              </Button>
              <FormHelperText>
                By clicking "Continue", you agree to our Terms and confirm
                you're 18 years or older.
              </FormHelperText>
            </FormControl>
            <Typography sx={{ fonstSize: '40px', textAlign: 'center' }}>
              Don't have an account?
              <span>
                <Link to="/sign-up">Sign Up</Link>
              </span>
            </Typography>
          </FormGroup>
        </Box>
      </Paper>
    </Box>
  );
}
