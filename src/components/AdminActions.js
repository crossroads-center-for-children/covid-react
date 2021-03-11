import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Menu, MenuItem, Modal, Paper, Typography, TextField } from '@material-ui/core';

import { useStyles } from './styles/AddUser.styles';
import AddStudent from '../forms/AddStudent/AddStudent';
import { setAddStudentIsOpen } from '../store/admin';

export default function AddUser() {
  const [anchorEl, setAnchorEl] = useState(null);
  const addStudentIsOpen = useSelector(state => state.admin.addStudentIsOpen);

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleOpenAddStudentModal = () => {
    dispatch(setAddStudentIsOpen(true));
  };
  const handleCloseAddStudentModal = () => {
    dispatch(setAddStudentIsOpen(false));
  };

  const handleAddStudent = () => {
    console.log('add student');
  };

  return (
    <Box className={classes.root}>
      <Button onClick={handleClick}>
        <i class='fas fa-plus fa-lg'></i>
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleOpenAddStudentModal}>Add Student</MenuItem>
        <MenuItem onClick={handleAddStudent}>Add Staff</MenuItem>
      </Menu>

      <Modal
        open={addStudentIsOpen}
        onClose={handleCloseAddStudentModal}
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          outline: 'none',
        }}>
        <AddStudent />
      </Modal>
    </Box>
  );
}
