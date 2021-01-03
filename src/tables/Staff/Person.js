import React, { useState } from 'react';
import {
  Box,
  Chip,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from './styles/Person.styles';

export default function Person({ person }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <TableRow key={person.id}>
        <TableCell component='th' scope='row'>
          <Link to={''} onClick={handleClick}>
            <i class='fas fa-expand-alt'></i>
          </Link>
        </TableCell>

        <TableCell component='th' scope='row'>
          {person.id}
        </TableCell>
        <TableCell component='th' scope='row'>
          {person.firstName}
        </TableCell>
        <TableCell component='th' scope='row'>
          {person.lastName}
        </TableCell>
        <TableCell component='th' scope='row'>
          {person.email}
        </TableCell>

        <TableCell component='th' scope='row'>
          {person.responses.length}
        </TableCell>
      </TableRow>

      <Modal open={isOpen} onClose={handleClose}>
        <Box>{person.id}</Box>
      </Modal>
    </>
  );
}
