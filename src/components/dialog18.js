import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

const DialogAge = ({ cancel, confirm, message }) => {
  const [open, setOpen] = useState(true);
  const token = sessionStorage.getItem('age');

  const handleClose = () => {
    sessionStorage.setItem('age', false);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          width: '500px',
          height: '200px',
          padding: '10px',
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          marginTop: '20px',
        }}
      ></DialogTitle>
      <DialogContent>
        <Typography sx={{ textAlign: 'center' }} variant="h4">
          ARE YOU OVER 18?
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginBottom: '12px',
        }}
      >
        <Button
          sx={{ backgroundColor: '#1B2B3A', color: '#fff', width: '200px' }}
          onClick={handleClose}
        >
          YES
        </Button>
        <Button onClick={confirm} sx={{ width: '200px' }}>
          NO
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAge;
