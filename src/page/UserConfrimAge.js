import { Typography, Dialog, Paper, Button } from '@mui/material';
import React from 'react';
import global from '../styles/global';
import DrawerAppBar from '../components/navbar';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import WarningIcon from '@mui/icons-material/Warning';

export default function UserConfrimAge() {
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [isAdult, setIsAdult] = useState(true);

  const handleNo = () => {
    setMessage(`Are you 21 and above? . This website contains adult
    material and is only suitable for those 21 years older.`);
  };

  useEffect(() => {
    handleNo();
  }, [isAdult]);

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
              {isAdult ? (
                <div>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ margin: '10px 0' }}
                  >
                    ADULTS ONLY (21+)
                  </Typography>
                  <Typography variant="h5">{message}</Typography>
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <WarningIcon sx={{ fontSize: '100px', color: '#B33A3A' }} />
                  <Typography variant="h4" color="#B33A3A" textAlign="justify">
                    (21+) Sorry! This website contains adult material and you
                    are not allowed to view this website
                  </Typography>
                </div>
              )}
            </div>

            {isAdult ? (
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
                    setIsAdult(false);
                  }}
                >
                  No
                </Button>
              </div>
            ) : (
              <Button
                sx={{ ...global.btnSecondary }}
                variant="outlined"
                onClick={() => {
                  window.location.replace('https://www.google.com/');
                }}
              >
                Exit
              </Button>
            )}
          </Paper>
        </Dialog>
      </div>
    </div>
  );
}
