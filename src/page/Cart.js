import { Paper, Typography, Button, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DrawerAppBar from '../components/navbar';
import '../styles/styles.css';
import { getSales } from './../fakeapi/sale';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './../service/firebase-config';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Cart() {
  const [sales, setSales] = useState([]);
  let user = JSON.parse(sessionStorage.getItem('USER'));

  useEffect(() => {
    const getCart = async () => {
      const q = query(collection(db, `users/${user?.uid}/cart`));
      const acc = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        acc.push(doc.data());
      });
      setSales(acc);
    };
    getCart();
  }, []);

  let sum = sales.reduce((a, v) => (a = a + parseInt(v.price)), 0);

  const handleDelete = async (item) => {
    console.log(item);
    const deleteAccount = sales.filter((a) => a.cartId !== item);
    setSales(deleteAccount);
    deleteDoc(doc(db, `users/${user.uid}/cart/${item}`));
  };

  const addToSession = () => {
    sessionStorage.setItem('BUY', JSON.stringify(sales));
  };

  return (
    <div>
      <div>
        <DrawerAppBar />
      </div>
      <div className="slider-container"></div>
      <IconButton
        sx={{
          color: 'white',
        }}
        component={Link}
        to="/shop"
      >
        <ArrowBackIcon sx={{ fontSize: '40px' }} />
        Back
      </IconButton>
      <div className="cart-container">
        <div className="cart-payment-container">
          <Paper
            sx={{
              padding: '20px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              fontWeight={700}
              sx={{
                marginRight: '40px',
                width: '200px',
              }}
            >
              Shopping Cart
            </Typography>
            <Typography fontWeight={700}>Product</Typography>
            <Typography fontWeight={700}>Quantity</Typography>
            <Typography fontWeight={700}>Price</Typography>

            <Typography fontWeight={700}>Delete</Typography>
          </Paper>
          {sales.map((s) => {
            return (
              <Paper
                sx={{
                  padding: '20px',
                  display: 'flex',
                  margin: '12px 0',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div className="cart-img">
                  <img src={s.image} alt={s.flavor} />
                </div>
                <div>
                  <Typography fontWeight={700}>
                    {s.flavor}x{s.mg}MG x {s.ml}ML
                  </Typography>
                </div>
                <div>
                  <Typography fontWeight={700}>{s.buyquantity}</Typography>
                </div>
                <div>
                  <Typography fontWeight={700}>₱{s.price}</Typography>
                </div>

                <div>
                  <Button
                    fontWeight={700}
                    sx={{ color: '#fff', background: '#B33A3A' }}
                    onClick={() => {
                      handleDelete(s.cartId);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Paper>
            );
          })}
        </div>
        <div className="cart-items-container">
          <Paper sx={{ padding: '20px' }}>
            <Typography fontWeight={700}>Card Totals</Typography>
          </Paper>

          <Paper
            sx={{
              padding: '20px',
              display: 'flex',
              margin: '12px 0',
              justifyContent: 'space-between',
              flexDirection: 'column',
            }}
          >
            <div>
              <Typography fontWeight={700}>Subtotal</Typography>
              <Typography fontWeight={700}>₱{sum} </Typography>
            </div>
            <div>
              <Typography fontWeight={700} sx={{ marginTop: '40px' }}>
                Cash On Delivery Only!
              </Typography>
              <Typography fontWeight={700}>Shipping Fee : ₱ 50 </Typography>
            </div>
            <Button
              fullWidth
              variant="contained"
              sx={{ margin: '20px 0' }}
              component={Link}
              to="/checkout"
              onClick={addToSession}
            >
              Place order
            </Button>
          </Paper>
        </div>
      </div>
    </div>
  );
}
