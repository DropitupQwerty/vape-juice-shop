import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import AddItems from '../../components/AddItems';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from './../../service/firebase-config';

export default function Orders() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState();

  useEffect(() => {
    const getJuice = async () => {
      const q = query(collection(db, `orders`));
      const acc = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        acc.push(doc.data());
      });
      setItems(acc);
    };
    getJuice();
  }, []);

  return (
    <div>
      <Typography variant="h4">Orders</Typography>

      <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Contact</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Address</TableCell>
              {/* <TableCell align="right"></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((row) => {
              let prod = row.sales;
              console.log(row);
              return (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {/* <img
                      src={image?.[0].image}
                      alt={row.flavor}
                      className="preview-image"
                    /> */}
                    {prod.map((prod) => {
                      console.log(prod);
                      return (
                        <Typography>
                          {prod.flavor} x {prod.quantity}
                        </Typography>
                      );
                    })}
                  </TableCell>
                  <TableCell align="right">{row.contact}</TableCell>
                  <TableCell align="right">
                    {row?.firstname}, {row.lastname}
                  </TableCell>
                  <TableCell align="right">
                    {row.streetaddress},{row.city}
                  </TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
