import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  InputLabel,
  FormControl,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Typography,
  TextField,
  Select,
} from '@material-ui/core';
import { useMutation } from '@apollo/client';

import { useStyles } from './AddParent.styles';
import { CREATE_USER } from '../../graphql/mutations';
import { setAddParentIsOpen, setParentOnStudent } from '../../store/admin';

export default function AddParent() {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(null);

  const [createParent] = useMutation(CREATE_USER, {
    onCompleted(data) {
      const parent = data.createUser;
      dispatch(setParentOnStudent(parent));
      handleGoBack();
    },
  });

  const handleGoBack = () => {
    dispatch(setAddParentIsOpen(false));
  };

  const handleCreateParent = () => {
    createParent({ variables: { firstName, lastName, email, phone, type: 'parent' } });
  };

  return (
    <Paper style={{ width: 400, height: 400 }}>
      <Button onClick={handleGoBack}>Back</Button>

      <Typography variant='h5' style={{ fontWeight: 'bold', fontFamily: 'Robotok' }}>
        Add Parent
      </Typography>

      <TextField label='First Name' value={firstName} onChange={e => setFirstName(e.target.value)}></TextField>
      <TextField label='Last Name' value={lastName} onChange={e => setLastName(e.target.value)}></TextField>
      <TextField label='Email' value={email} onChange={e => setEmail(e.target.value)}></TextField>
      <TextField label='Phone' value={phone} onChange={e => setPhone(e.target.value)}></TextField>

      <Button onClick={handleCreateParent}>Create Parent</Button>
    </Paper>
  );
}
