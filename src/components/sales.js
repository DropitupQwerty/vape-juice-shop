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
import { getSales } from './../fakeapi/sale';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import global from '../styles/global';

export default function Sales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const itemToSell = () => {
      const items = getSales();
      setSales(items);
    };
    itemToSell();
  }, []);

  const handleAddtoCart = (id) => {
    const salesClone = sales;
    const index = salesClone.indexOf(id);
    console.log(index);
    salesClone[index] = { ...salesClone[index] };
    salesClone[index].onCart = !salesClone[index].onCart;
    setSales([...salesClone]);
  };

  return (
    <div>
      <Paper sx={{ padding: '40px' }}>
        <Grid container spacing={4}>
          {sales.map((sale) => {
            const { flavor, nicotineLevel, image, price } = sale;
            return (
              <Grid item key={sale.id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="190"
                    image={`${image}`}
                    alt={`${sale.flavor}`}
                  />
                </Card>
                <CardContent>
                  <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                    {flavor}
                  </Typography>
                  <Typography sx={{ fontSize: '11px', fontWeight: 'bold' }}>
                    {price}.00
                  </Typography>
                  <Typography sx={{ fontSize: '11px' }}>
                    Nicotine level :{' '}
                    {/* {nicotineLevel.map((n) => {
                      return <Button>{n}</Button>;
                    })} */}
                  </Typography>
                </CardContent>
                <CardActions>
                  {sales.onCart ? (
                    <h2>view cart</h2>
                  ) : (
                    <div>
                      <Button
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-around',
                          ...global.btnPrimary,
                        }}
                        fullWidth
                      >
                        <Typography>Buy</Typography>
                      </Button>

                      <IconButton onClick={() => handleAddtoCart(sale?.id)}>
                        <AddShoppingCartIcon />
                      </IconButton>
                    </div>
                  )}
                </CardActions>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </div>
  );
}
