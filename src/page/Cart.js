import { Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DrawerAppBar from '../components/navbar';
import '../styles/styles.css';
import { getSales } from './../fakeapi/sale';

export default function Cart() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const getJuice = () => {
      const juices = getSales();
      console.log(juices.flavor);
      setSales(juices);
    };
    getJuice();
  }, []);

  console.log(sales);

  return (
    <div>
      <div>
        <DrawerAppBar />
      </div>
      <div className="slider-container"></div>
      <div className="cart-container">
        <div className="cart-payment-container">
          <Paper sx={{ padding: '20px' }}>
            <Typography fontWeight={700}>Shopping Cart</Typography>
          </Paper>
          {sales.map((s) => {
            return (
              <Paper
                sx={{ padding: '20px', display: 'flex', margin: '12px 0' }}
              >
                <div className="cart-img">
                  <img src={s.image} alt={s.flavor} />
                </div>
                <div>
                  <Typography fontWeight={700}>{s.flavor}</Typography>
                  <Typography fontWeight={700}>{s.flavor}</Typography>
                </div>
              </Paper>
            );
          })}
        </div>
        <div className="cart-items-container">
          <Paper sx={{ padding: '20px' }}>
            <Typography fontWeight={700}>My order</Typography>
          </Paper>
        </div>
      </div>
    </div>
  );
}
