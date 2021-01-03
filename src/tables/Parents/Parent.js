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
import { useStyles } from './styles/Parent.styles';

export default function Parent({ parent }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  console.log(parent);

  const handleClick = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleChange = e => setChecked(e.target.checked);

  return (
    <>
      <TableRow key={parent.id}>
        <TableCell component='th' scope='row'>
          <Link to={''} onClick={handleClick}>
            <i class='fas fa-expand-alt'></i>
          </Link>
        </TableCell>

        <TableCell component='th' scope='row'>
          {parent.id}
        </TableCell>
        <TableCell component='th' scope='row'>
          {parent.firstName}
        </TableCell>
        <TableCell component='th' scope='row'>
          {parent.lastName}
        </TableCell>

        <TableCell component='th' scope='row'>
          <a href={`mailto:${parent.email}`}>{parent.email}</a>
        </TableCell>

        <TableCell component='th' scope='row'>
          <a href={`tel:${parent.phone}`}>{parent.phone}</a>
        </TableCell>

        <TableCell component='th' scope='row'>
          {parent.children.map(child => (
            <Chip label={`${child.firstName} ${child.lastName}`} clickable />
          ))}
        </TableCell>

        <TableCell component='th' scope='row'>
          {parent.responses.length}
        </TableCell>
      </TableRow>

      <Modal open={isOpen} onClose={handleClose}>
        <Box>{parent.id}</Box>
      </Modal>
    </>
  );
}
