import React, { useState } from 'react';
import {
  Box,
  Chip,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from './styles/Parents.styles';
import Parent from './Parent';

export default function Parents({ parents }) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  const handleChange = e => setChecked(e.target.checked);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>

            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Students</TableCell>
            <TableCell>Responses</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {parents.map(parent => (
            <Parent parent={parent} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
