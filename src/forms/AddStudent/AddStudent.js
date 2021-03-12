import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Chip,
  Divider,
  InputLabel,
  FormControl,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Tooltip,
  Typography,
  TextField,
  Select,
} from '@material-ui/core';

import LinkIcon from '@material-ui/icons/Link';
import AddIcon from '@material-ui/icons/Add';

import { useMutation } from '@apollo/client';

import { CREATE_STUDENT } from '../../graphql/mutations';
import { useStyles } from './AddStudent.styles';
import { setAddStudentIsOpen, setAddParentIsOpen } from '../../store/admin';
import AddParent from '../AddParent/AddParent';

export default function AddStudent() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [tags, setTags] = useState([]);
  const [addParentModalIsOpen, setAddParentModalIsOpen] = useState(false);
  const [linkParentModalIsOpen, setLinkParentModalIsOpen] = useState(false);

  const parents = useSelector(state => state.admin.newStudent.parents);
  const addParentIsOpen = useSelector(state => state.admin.addParentIsOpen);
  const roomNumberOptions = [
    'None',
    'Clinic',
    'Daycare',
    'Room 1',
    'Room 2',
    'Room 3',
    'Room 4',
    'Room 5',
    'Room 6',
    'Room 7',
    'Room 8',
    'Room 9',
    'Room 10',
    'Room 11',
    'Room 12',
    'Room 13',
    'Room 14',
    'Room 15',
  ];

  const [createStudent] = useMutation(CREATE_STUDENT, {
    onCompleted(data) {
      const student = data.createStudent;
      console.log(student);
      dispatch(setAddStudentIsOpen(false));
    },
  });

  const handleSelectRoomNumber = e => {
    console.log(typeof e.target.value);
    console.log(e.target.value);
    setRoomNumber(e.target.value);
  };

  const handleOpenAddParentModal = () => {
    dispatch(setAddParentIsOpen(true));
  };
  const handleCloseAddParentModal = () => {
    dispatch(setAddParentIsOpen(false));
  };

  const handleOpenLinkParentModal = () => setLinkParentModalIsOpen(true);
  const handleCloseLinkParentModal = () => setLinkParentModalIsOpen(false);

  const handleCreateStudent = () => {
    createStudent({ variables: { firstName, lastName, room: roomNumber, parents, tags } });
  };

  return (
    <Paper
      style={{
        width: 400,
        height: 500,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography variant='h5' style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>
          Add Student
        </Typography>

        <i class='fas fa-times-circle fa-lg' style={{ color: '#bdbdbd' }}></i>
      </Box>

      <Divider />
      <Box
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <FormControl>
          <TextField
            label='First Name'
            value={firstName}
            variant='outlined'
            onChange={e => setFirstName(e.target.value)}
            style={{ width: 400, margin: '5px 0px' }}></TextField>
        </FormControl>

        <FormControl>
          <TextField
            label='Last Name'
            value={lastName}
            variant='outlined'
            onChange={e => setLastName(e.target.value)}
            style={{ width: 400, margin: '5px 0px' }}></TextField>
        </FormControl>

        <FormControl>
          <InputLabel id='room-label' style={{ marginLeft: 15, marginTop: 7.5 }}>
            Room
          </InputLabel>
          <Select
            labelId='room-label'
            defaultValue={roomNumber}
            variant='outlined'
            onChange={handleSelectRoomNumber}
            style={{ width: 400, margin: '5px 0px' }}>
            {roomNumberOptions.map(roomNumberOption => (
              <MenuItem value={roomNumberOption}>{roomNumberOption}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box>
        {parents.length > 0 ? (
          <Box>
            <Typography>Parents</Typography>
            {parents.map(parent => (
              <Chip style={{ margin: 2 }} label={`${parent.firstName} ${parent.lastName}`} />
            ))}
          </Box>
        ) : null}
      </Box>

      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid #bdbdbd',
          borderRadius: 10,
          marginTop: 20,
          padding: 10,
        }}>
        <Box>
          <Typography>Optional</Typography>
        </Box>

        <Box>
          <Tooltip title='Add Parent'>
            <Button onClick={handleOpenAddParentModal}>
              <i class='fas fa-user-plus fa-2x' style={{ color: '#41B35D' }}></i>
            </Button>
          </Tooltip>

          <Tooltip title='Link Parent'>
            <Button onClick={handleOpenLinkParentModal}>
              <i class='fas fa-user-tag fa-2x' style={{ color: '#1771E6' }}></i>
            </Button>
          </Tooltip>

          <Tooltip title='Add Tags'>
            <Button>
              <i class='fas fa-tags fa-2x' style={{ color: '#2DB19E' }}></i>
            </Button>
          </Tooltip>

          <Tooltip title='Add Address'>
            <Button>
              <i class='fas fa-map-marker-alt fa-2x' style={{ color: '#F8523D' }}></i>
            </Button>
          </Tooltip>
        </Box>
      </Box>
      <Box>
        <Button
          fullWidth
          disabled={firstName && lastName && roomNumber ? false : true}
          style={{
            marginTop: 10,
            color: 'white',
            backgroundColor: firstName && lastName && roomNumber ? '#1771E6' : '#f5f5f5',
          }}
          onClick={handleCreateStudent}>
          Add
        </Button>
      </Box>
      <Modal
        open={addParentIsOpen}
        onClose={handleCloseAddParentModal}
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          outline: 'none',
        }}>
        <AddParent />
      </Modal>

      <Modal
        open={linkParentModalIsOpen}
        onClose={handleCloseLinkParentModal}
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          outline: 'none',
        }}>
        <Paper style={{ width: 400, height: 400 }}>
          <Button onClick={handleCloseLinkParentModal}>Back</Button>
          <Typography variant='h5' style={{ fontWeight: 'bold', fontFamily: 'Robotok' }}>
            Link Parent
          </Typography>
        </Paper>
      </Modal>
    </Paper>
  );
}
