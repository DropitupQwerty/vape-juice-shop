import { Typography, Dialog, Paper, Button } from '@mui/material';
import React from 'react';
import global from '../styles/global';
import DrawerAppBar from '../components/navbar';
import { useNavigate } from 'react-router-dom';

export default function UserConfrimAge() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <DrawerAppBar />
      </div>
      <div>
        <Dialog open={true} sx={{ bgcolor: '#000' }}>
          <Paper
            sx={{
              padding: '40px',
              height: '450px',
              width: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ margin: '10px 0' }}
              >
                ADULTS ONLY (21+)
              </Typography>

              <Typography variant="h5">
                <b>Are you 21 and above?</b> . This website contains adult
                material and is only suitable for those 21 years older.
              </Typography>
            </div>

            <div>
              <Button
                sx={{ ...global.btnPrimary }}
                fullWidth
                onClick={() => {
                  navigate('/shop');
                }}
              >
                Yes
              </Button>
              <Button
                sx={{ ...global.btnSecondary }}
                fullWidth
                onClick={() => {
                  navigate(-1);
                }}
              >
                No
              </Button>
            </div>
          </Paper>
        </Dialog>
      </div>
    </div>
  );
}
