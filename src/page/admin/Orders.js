import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material';
import React from 'react';

export default function Orders() {
  return (
    <div>
      <Typography variant="h4">Orders</Typography>

      <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Address</TableCell>
              {/* <TableCell align="right"></TableCell> */}
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
