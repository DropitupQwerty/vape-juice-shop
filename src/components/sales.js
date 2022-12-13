import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  Divider,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import global from '../styles/global';
import FlavorCategory from './FlavorCategory';
import {
  query,
  collection,
  getDocs,
  where,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './../service/firebase-config';
import { Link } from 'react-router-dom';
import BuyDialog from './BuyDialog';

export default function Sales() {
  const [sales, setSales] = useState();
  const [category, setCategory] = useState('');
  const [openBuyDialog, setOpenBuyDialog] = useState(false);
  const [item, setItem] = useState();
  let user = JSON.parse(sessionStorage.getItem('USER'));

  useEffect(() => {
    const getJuice = async () => {
      if (category === '') {
        const q = query(collection(db, `juice`));
        const acc = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          acc.push(doc.data());
        });
        setSales(acc);
      } else {
        const q = query(
          collection(db, `juice`),
          where('category', '==', category)
        );
        const acc = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          acc.push(doc.data());
        });
        setSales(acc);
      }
    };
    getJuice();
  }, [category]);

  const handleAddtoCart = async (item) => {
    const salesClone = sales;
    const index = salesClone.indexOf(item);
    salesClone[index] = { ...salesClone[index] };
    salesClone[index].onCart = !salesClone[index].onCart;

    const add = await addDoc(collection(db, `users/${user?.uid}/cart`), {
      ...item,
      ml: 60,
      mg: 15,
      buyquantity: 1,
    }).then(async (res) => {
      await updateDoc(doc(db, `users/${user?.uid}/cart/${res.id}`), {
        cartId: res.id,
      });
    });

    setSales([...salesClone]);
  };

  const handleChange = (e, cat) => {
    setCategory(cat);
    console.log(cat);
  };

  const handleOpenBuyDialog = (item) => {
    setItem(item);
    setOpenBuyDialog(true);
  };

  const handleCloseBuyDialog = () => {
    setOpenBuyDialog(false);
  };

  return (
    <div>
      <BuyDialog
        open={openBuyDialog}
        item={item}
        cancel={handleCloseBuyDialog}
      />
      <Paper
        sx={{
          padding: '40px',
          width: '80vw',
          margin: '0 10px',
          minHeight: '800px',
        }}
      >
        <ToggleButtonGroup
          sx={{ display: 'flex', alignItems: 'center', margin: '10px' }}
          value={category}
          exclusive
          onChange={handleChange}
        >
          <Typography fontWeight={700} margin={2}>
            JUICE FLAVOR:{' '}
          </Typography>
          <ToggleButton value={'Fruity'}>FRUITY</ToggleButton>
          <ToggleButton value={'Pastry'}>PASTRY</ToggleButton>
          <ToggleButton value={''}>ALL</ToggleButton>
        </ToggleButtonGroup>

        <Divider />
        <Grid container spacing={1} sx={{ marginTop: '10px' }}>
          {sales?.map((sale) => {
            const { flavor, image, price, nicotinelevel } = sale || {};
            return (
              <Grid item key={sale.id} xs={6} md={3}>
                <Card sx={{ maxWidth: 345, padding: '40px' }}>
                  <CardMedia
                    component="img"
                    height={200}
                    sx={{ objectFit: 'cover', width: '200px' }}
                    image={`${image}`}
                    alt={`${sale.flavor}`}
                  />

                  <CardContent>
                    <Typography sx={{ fontSize: '17px', fontWeight: 'bold' }}>
                      Flavor: {flavor}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '17px',
                        fontWeight: 'bold',
                        marginBottom: '12px',
                      }}
                    >
                      Price : {price}.00
                    </Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                      Nicotine level :
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      {nicotinelevel?.map((mg) => {
                        return (
                          <Typography sx={{ fontSize: '13px' }}>
                            {mg} Mg ,
                          </Typography>
                        );
                      })}
                    </Box>
                    <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                      ML :
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      {sale?.mililiter?.map((ml) => {
                        return (
                          <Typography sx={{ fontSize: '13px' }}>
                            {ml} ML ,
                          </Typography>
                        );
                      })}
                    </Box>
                  </CardContent>
                  <CardActions>
                    {sale.onCart ? (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button component={Link} to="/cart">
                          View Cart
                          <ArrowForwardIcon />
                        </Button>
                      </div>
                    ) : (
                      <div className="btn-items">
                        <Button
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            ...global.btnPrimary,
                          }}
                          fullWidth
                          onClick={() => {
                            handleOpenBuyDialog(sale);
                          }}
                        >
                          <Typography>Buy</Typography>
                        </Button>

                        {!!user ? (
                          <IconButton
                            onClick={() => handleAddtoCart(sale)}
                            sx={{ marginLeft: '10px' }}
                          >
                            <AddShoppingCartIcon />
                          </IconButton>
                        ) : null}
                      </div>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </div>
  );
}
