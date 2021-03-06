import React, { useState } from 'react';
import {
  Box,
  Chip,
  Checkbox,
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
import { useStyles } from './styles/Response.styles';

export default function Response({ response }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <TableRow key={response.id}>
        <TableCell component='th' scope='row'>
          <Link to={''} onClick={handleClick}>
            <i class='fas fa-expand-alt'></i>
          </Link>
        </TableCell>

        <TableCell component='th' scope='row'>
          {response.id}
        </TableCell>
        <TableCell component='th' scope='row'>
          {response.date}
        </TableCell>
        <TableCell component='th' scope='row'>
          {response.user}
        </TableCell>

        <TableCell component='th' scope='row'>
          {response.student ? response.student : response.user}
        </TableCell>

        <TableCell component='th' scope='row'>
          {response.status === 'pass' ? (
            <i class='fas fa-check-circle fa-lg' style={{ color: 'green' }}></i>
          ) : response.status === 'fail' ? (
            <i class='fas fa-times-circle fa-lg' style={{ color: 'red' }}></i>
          ) : (
            <i class='fas fa-exclamation-triangle fa-lg' style={{ color: 'orange' }}></i>
          )}
        </TableCell>
      </TableRow>

      <Modal open={isOpen} onClose={handleClose}>
        <Box>{response.id}</Box>
      </Modal>
    </>
  );
}
