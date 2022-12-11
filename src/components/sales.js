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
  const [category, setCategory] = useState();
  const [open, setOpen] = useState(true);
  const [openBuyDialog, setOpenBuyDialog] = useState(false);
  const [item, setItem] = useState();
  let user = JSON.parse(sessionStorage.getItem('USER'));

  useEffect(() => {
    const getJuice = async () => {
      const q = query(collection(db, `juice`));
      const acc = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        acc.push(doc.data());
      });
      setSales(acc);
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
      quantity: 1,
      ml: 60,
    }).then(async (res) => {
      await updateDoc(doc(db, `users/${user?.uid}/cart/${res.id}`), {
        id: res.id,
      });
    });

    setSales([...salesClone]);
  };

  const handleFruity = () => {
    setCategory('Fruity');
    setOpen(false);
  };

  const hanldePastry = () => {
    setCategory('Pastry');
    setOpen(false);
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
      <FlavorCategory open={open} fruity={handleFruity} pastry={hanldePastry} />
      <BuyDialog
        open={openBuyDialog}
        item={item}
        cancel={handleCloseBuyDialog}
      />
      <Paper sx={{ padding: '40px', width: '80vw', margin: '0 10px' }}>
        <Typography
          sx={{
            fontSize: '40px',
            marginBottom: '20px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {category}
        </Typography>
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
                    <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                      {flavor}
                    </Typography>
                    <Typography sx={{ fontSize: '13px', fontWeight: 'bold' }}>
                      {price}.00
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '13px',
                        marginTop: '5px',
                        fontWeight: '700',
                      }}
                    >
                      Nicotine level : {nicotinelevel} mg
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '13px',
                        marginTop: '5px',
                        fontWeight: '700',
                      }}
                    >
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
