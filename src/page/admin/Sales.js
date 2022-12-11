import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Button,
  TableBody,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import AddItems from '../../components/AddItems';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './../../service/firebase-config';

export default function Sales() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState();

  const handleOpen_Dialog = () => {
    setOpen(true);
  };

  const handleClose_Dialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getJuice = async () => {
      const q = query(collection(db, `juice`));
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
      <Typography variant="h4">Juice for Sale</Typography>
      <AddItems open={open} cancel={handleClose_Dialog} />

      <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
        <div style={{ margin: '20px' }}>
          <Button variant="outlined" onClick={handleOpen_Dialog}>
            <AddIcon /> <Typography>Add Item</Typography>
          </Button>
        </div>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Juice</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Nicotine Level</TableCell>
              <TableCell>Juice Category</TableCell>
              <TableCell>Mg</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    src={row.image}
                    alt={row.flavor}
                    className="preview-image"
                  />
                </TableCell>
                <TableCell>{row.flavor}</TableCell>
                <TableCell> ₱ {row.price}</TableCell>
                <TableCell>{row.nicotinelevel} mg</TableCell>
                <TableCell>{row.category} </TableCell>
                <TableCell>{row.miligram} mg </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
