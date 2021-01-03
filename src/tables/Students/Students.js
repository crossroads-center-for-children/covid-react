import React from 'react';
import { Box, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from './styles/Students.styles';
import Student from './Student';

export default function Students({ students }) {
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
            <TableCell>Room</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell>Responses</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map(student => (
            <Student student={student} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
