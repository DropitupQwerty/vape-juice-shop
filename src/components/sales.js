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
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import global from '../styles/global';
import FlavorCategory from './FlavorCategory';
import { query, collection, getDocs, where, addDoc } from 'firebase/firestore';
import { db } from './../service/firebase-config';
import { Link } from 'react-router-dom';

export default function Sales() {
  const [sales, setSales] = useState();
  const [category, setCategory] = useState();
  const [open, setOpen] = useState(true);

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

    const add = await addDoc(collection(db, 'orders'), {});

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
  sales?.map((s) => {
    console.log(s.onCart);
  });
  console.log(category);

  return (
    <div>
      <FlavorCategory open={open} fruity={handleFruity} pastry={hanldePastry} />
      <Paper sx={{ padding: '40px', width: '80vw', margin: '0 40px' }}>
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
        <Grid container spacing={1}>
          {sales?.map((sale) => {
            const { flavor, image, price } = sale;
            return (
              <Grid item key={sale.id}>
                <Card sx={{ maxWidth: 345, padding: '40px' }}>
                  <CardMedia
                    component="img"
                    height={200}
                    sx={{ objectFit: 'cover', width: '200px' }}
                    image={`${image}`}
                    alt={`${sale.flavor}`}
                  />

                  <CardContent>
                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                      {flavor}
                    </Typography>
                    <Typography sx={{ fontSize: '11px', fontWeight: 'bold' }}>
                      {price}.00
                    </Typography>
                    <Typography sx={{ fontSize: '11px' }}>
                      Nicotine level :
                    </Typography>
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
                            marginRight: '20px',
                          }}
                          fullWidth
                        >
                          <Typography>Buy</Typography>
                        </Button>

                        <IconButton onClick={() => handleAddtoCart(sale)}>
                          <AddShoppingCartIcon />
                        </IconButton>
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
