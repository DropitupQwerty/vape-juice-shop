import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Button,
} from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import AddItems from '../../components/AddItems';

export default function Orders() {
  const [open, setOpen] = useState(false);

  const handleOpen_Dialog = () => {
    setOpen(true);
  };

  const handleClose_Dialog = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography variant="h4">Orders</Typography>
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
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
        </Table>
      </TableContainer>
    </div>
  );
}
