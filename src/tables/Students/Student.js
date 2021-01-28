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
import { useStyles } from './styles/Student.styles';

export default function Students({ student }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <TableRow key={student.id}>
        <TableCell component='th' scope='row'>
          <Link to={''} onClick={handleClick}>
            <i class='fas fa-expand-alt'></i>
          </Link>
        </TableCell>

        <TableCell component='th' scope='row'>
          {student.id}
        </TableCell>
        <TableCell component='th' scope='row'>
          {student.firstName}
        </TableCell>
        <TableCell component='th' scope='row'>
          {student.lastName}
        </TableCell>
        <TableCell component='th' scope='row'>
          {student.room}
        </TableCell>
        <TableCell component='th' scope='row'>
          {student.tags.map(tag => (
            <Chip label={tag} size='small' style={{ marginRight: 2, marginLeft: 2 }} />
          ))}
        </TableCell>
        <TableCell component='th' scope='row'>
          {student.responses.length}
        </TableCell>
      </TableRow>

      <Modal open={isOpen} onClose={handleClose}>
        <Box>{student.id}</Box>
      </Modal>
    </>
  );
}
