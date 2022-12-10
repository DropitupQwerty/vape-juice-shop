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
import FlavorCategory from './FlavorCategory';

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [category, setCategory] = useState();
  const [open, setOpen] = useState(true);

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

  const handleFruity = () => {
    setCategory('Fruity');
    setOpen(false);
  };

  const hanldePastry = () => {
    setCategory('Pastry');
    setOpen(false);
  };

  console.log(category);

  return (
    <div>
      <FlavorCategory open={open} fruity={handleFruity} pastry={hanldePastry} />
      <Paper sx={{ padding: '40px' }}>
        <Typography
          variant="h4"
          sx={{ marginBottom: '20px', fontWeight: 'bold' }}
        >
          {category}
        </Typography>{' '}
        <Grid container spacing={4}>
          {sales.map((sale) => {
            const { flavor, image, price } = sale;
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
                    <div className="btn-items">
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
