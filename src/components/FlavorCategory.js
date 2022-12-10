import { Dialog, Button, Paper, Typography, DialogTitle } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export default function FlavorCategory({ open = true, fruity, pastry }) {
  const style = {
    box: {
      height: '80%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    },
  };

  return (
    <div>
      <Dialog
        open={open}
        PaperProps={{
          style: {
            border: '1px solid #333',
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: '#1B2B3A',
            textAlign: 'center',
            marginTop: '20px',
            fontWeight: '700',
          }}
        >
          Juice Category
        </Typography>
        <Box
          sx={{
            height: '500px',
            width: '500px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={style.box}>
            <Typography
              variant="h5"
              sx={{ color: '#1B2B3A', fontWeight: '400' }}
            >
              Fruity
            </Typography>
            <button
              className="btn-fruity btn-flavor"
              variant="outlined"
              onClick={fruity}
            ></button>
          </Box>

          <Typography variant="h5" sx={{ color: '#1B2B3A' }}>
            Or
          </Typography>
          <Box sx={style.box}>
            <Typography
              variant="h5"
              sx={{ color: '#1B2B3A', fontWeight: '400' }}
            >
              Pastry
            </Typography>
            <button className="btn-pastry btn-flavor" onClick={fruity}></button>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
