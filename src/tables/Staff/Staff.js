import React from 'react';
import { Box, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from './styles/Staff.styles';
import Person from './Person';

export default function Staff({ staff }) {
  const classes = useStyles();
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
            <TableCell>Responses</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {staff.map(person => (
            <Person person={person} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
