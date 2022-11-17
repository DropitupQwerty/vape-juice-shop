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
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getSales } from './../fakeapi/sale';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export default function Sales() {
  const [sales, setSales] = useState([]);
  console.log(sales);

  sales.map((s) => {
    console.log(s.item);
  });

  useEffect(() => {
    const itemToSell = () => {
      const items = getSales();
      setSales(items);
    };
    itemToSell();
  }, []);

  return (
    <div>
      <Paper sx={{ padding: '40px' }}>
        <Grid container spacing={4}>
          {sales.map((sale) => {
            const { flavor, nicotineLevel, image, price } = sale;
            return (
              <Grid item>
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
                  <Button
                    sx={{ display: 'flex', justifyContent: 'space-around' }}
                    fullWidth
                  >
                    <Typography>Buy</Typography>
                    <ShoppingCartOutlinedIcon />
                  </Button>
                </CardActions>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </div>
  );
}
