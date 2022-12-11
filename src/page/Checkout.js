import React, { useEffect, useState } from 'react';
import DrawerAppBar from '../components/navbar';
import {
  Box,
  FormControl,
  FormGroup,
  Paper,
  Typography,
  OutlinedInput,
  Button,
} from '@mui/material';
import global from '../styles/global';
import {
  collection,
  getDocs,
  query,
  addDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { db } from './../service/firebase-config';
import LoaderDialog from '../components/LoaderDialog';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let user = JSON.parse(sessionStorage.getItem('USER'));
  const [order, setOrder] = useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    province: '',
    contact: '',
    email: '',
  });

  const { firstname, lastname, streetaddress, province, contact, email } =
    order || {};

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

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleBuy = async () => {
    setIsLoading(true);

    await addDoc(collection(db, 'orders'), {
      ...order,
      sales,
    })
      .then(async (res) => {
        await updateDoc(doc(`orders/${res.id}`), {
          id: res.id,
        });
        setIsLoading(false);
        setOrder({
          firstname: '',
          lastname: '',
          streetaddress: '',
          province: '',
          contact: '',
          email: '',
        });
      })
      .catch((e) => [setIsLoading(false)]);
  };

  return (
    <div>
      <div>
        <DrawerAppBar />
      </div>
      <LoaderDialog open={isLoading} />
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          margin: '40px 0',
        }}
      >
        <Paper
          sx={{
            width: '40%',
            marginTop: '70px',
            padding: '20px',
          }}
        >
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            CHECKOUT DETAILS
          </Typography>
          <Box sx={{ width: '95%', marginTop: '40px' }}>
            <Box>
              <FormGroup>
                <div>
                  <Typography fontWeight="bold"> BILLING & SHIPPING</Typography>
                  <FormControl sx={{ ...global.addForm }} fullWidth>
                    <Typography>First Name</Typography>
                    <OutlinedInput
                      name="firstname"
                      placeholder="eg. Gilbert"
                      value={firstname}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                  <FormControl sx={{ ...global.addForm }} fullWidth>
                    <Typography>Last Name</Typography>
                    <OutlinedInput
                      name="lastname"
                      placeholder="eg. Perez"
                      value={lastname}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                </div>
                <div>
                  <Typography fontWeight="bold"> ADDRESS</Typography>
                  <FormControl sx={{ ...global.addForm }} fullWidth>
                    <Typography>Street Address</Typography>
                    <OutlinedInput
                      name="streetaddress"
                      placeholder="eg. Pulo"
                      value={streetaddress}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                  <FormControl sx={{ ...global.addForm }} fullWidth>
                    <Typography>Province</Typography>
                    <OutlinedInput
                      name="province"
                      placeholder="eg. Bulacan"
                      value={province}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl sx={{ ...global.addForm }} fullWidth>
                    <Typography>Phone Number</Typography>
                    <OutlinedInput
                      name="contact"
                      placeholder="eg. 09123456789"
                      value={contact}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                  <FormControl sx={{ ...global.addForm }} fullWidth>
                    <Typography>Email Address</Typography>
                    <OutlinedInput
                      name="email"
                      placeholder="eg. gj@gmail.com"
                      value={email}
                      onChange={handleChange}
                      required
                      type="email"
                    />
                  </FormControl>
                </div>

                <div>
                  <Typography fontWeight="bold">YOUR ORDERS</Typography>
                  {sales.map((i) => {
                    return (
                      <Typography fontWeight="bold" sx={{ ...global.addForm }}>
                        {i?.flavor} x {i?.quantity}
                      </Typography>
                    );
                  })}
                  <Typography fontWeight="bold" textAlign="right" variant="h6">
                    Total :₱ {sum}
                  </Typography>
                </div>
                <div>
                  <FormControl sx={{ ...global.addForm }} fullWidth>
                    <Button variant="contained" onClick={handleBuy}>
                      PLACE ORDER
                    </Button>
                  </FormControl>
                  <FormControl sx={{ ...global.addForm }} fullWidth>
                    <Button variant="outlined" component={Link} to="/shop">
                      BACK
                    </Button>
                  </FormControl>
                </div>
              </FormGroup>
            </Box>
          </Box>
        </Paper>
      </div>
    </div>
  );
}
