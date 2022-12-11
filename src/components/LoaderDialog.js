import React from 'react';
import { Oval } from 'react-loader-spinner';
import { Box, Dialog, DialogContent, Typography } from '@mui/material';

const LoaderDialog = ({ isLoading, open, message }) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          borderRadius: 10,
          height: '100px',
          width: '200px',
          padding: '10px',
        },
      }}
    >
      <DialogContent>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Oval
            height={40}
            width={40}
            color="#1b2b3a"
            visible={isLoading}
            ariaLabel="oval-loading"
            secondaryColor="primary"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
          {message && (
            <Typography sx={{ marginTop: '10px' }}>{message}</Typography>
          )}
        </Box>
      </DialogContent>

      {/* <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginBottom: '12px',
        }}
      >
        <Button sx={{ ...global.button2xs }} onClick={cancel}>
          Cancel
        </Button>
        <Button autoFocus sx={{ ...global.button1xs }} onClick={confirm}>
          Confirm
        </Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default LoaderDialog;
