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
import { useStyles } from './styles/Responses.styles';
import Response from './Response';

export default function Responses({ responses }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Submitted By</TableCell>
            <TableCell>Submitted For</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {responses.map(response => (
            <Response response={response} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
