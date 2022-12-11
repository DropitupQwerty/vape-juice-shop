import { Box, Button, Dialog, IconButton, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import global from '../styles/global';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginOrSignUp({ open, cancel, openLogin }) {
  const navigate = useNavigate();

  return (
    <div>
      <Dialog open={open}>
        <Box sx={{ width: '500px', padding: '60px 40px' }}>
          <IconButton
            sx={{
              position: 'absolute',
              top: '10px',
              right: '20px',
            }}
            onClick={cancel}
          >
            <CloseIcon sx={{ fontSize: '30px' }} />
          </IconButton>

          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              navigate('/login');
            }}
          >
            LOGIN
          </Button>
          <Typography
            variant="h5"
            sx={{ textAlign: 'center', margin: '10px 0' }}
          >
            Or
          </Typography>
          <Button
            sx={{ ...global.btnSecondary }}
            fullWidth
            component={Link}
            to="/sign-up"
            variant="outlined"
          >
            Sign Up
          </Button>

          <Typography>
            By continuing, you agree to Vape Ph and Manufacturing
            <Link>Terms of Use</Link> . Read our <Link>Privacy Policy</Link>
          </Typography>
        </Box>
      </Dialog>
    </div>
  );
}
