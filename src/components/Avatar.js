import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Divider, Grid, Link, Popover, Typography } from '@material-ui/core';
import { logout } from '../store/auth';
export default function Avatar({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const curUser = useSelector(state => state.auth.user) || false;

  const [isOpen, setIsOpen] = useState(false);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);

  const openPopover = e => setPopoverAnchorEl(e.currentTarget);
  const closePopover = () => setPopoverAnchorEl(null);

  const handleLogOut = () => {
    dispatch(logout());
    window.location.reload();
  };

  useEffect(() => {
    if (!curUser) navigate('/');
  }, [curUser, navigate]);

  return (
    <>
      <Button onClick={openPopover}>
        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <i class='fas fa-user-circle fa-lg' style={{ color: user.type === 'admin' ? '#171c28' : '#f5f5f5' }}></i>
          <Typography
            style={{ fontFamily: 'Roboto', color: user.type === 'admin' ? '#171c28' : '#f5f5f5', marginLeft: 5 }}>
            {user.firstName}
          </Typography>
        </Box>
      </Button>

      <Popover
        open={Boolean(popoverAnchorEl)}
        anchorEl={popoverAnchorEl}
        onClose={closePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
        <Grid
          container
          direction='column'
          justify='space-between'
          alignItems='flex-start'
          style={{ padding: '0px 20px' }}>
          <Typography
            variant='h5'
            style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>{`${user.firstName} ${user.lastName}`}</Typography>
          <Typography variant='caption' style={{ fontFamily: 'Roboto', color: '#424242' }}>
            {user.email}
          </Typography>
        </Grid>
        <Divider />
        <Grid
          container
          direction='column'
          justify='space-between'
          alignItems='flex-start'
          style={{ padding: '0px 10px' }}>
          <Button fullWidth style={{ width: '100%' }}>
            <i class='fas fa-question-circle' style={{ marginRight: 5, color: '#757575' }}></i>
            <Typography style={{ fontFamily: 'Roboto', color: '#424242' }}>Support</Typography>
          </Button>

          <Button fullWidth style={{ width: '100%' }}>
            <i class='fas fa-comment-alt' style={{ marginRight: 5, color: '#757575' }}></i>
            <Typography style={{ fontFamily: 'Roboto', color: '#424242' }}>Feedback</Typography>
          </Button>
        </Grid>

        <Grid container direction='column' justify='space-between' alignItems='flex-start'>
          <Button fullWidth style={{ width: '100%', backgroundColor: '#f5f5f5' }} onClick={handleLogOut}>
            <i class='fas fa-sign-out-alt' style={{ marginRight: 5, color: '#757575' }}></i>
            <Typography style={{ fontFamily: 'Roboto', color: '#424242' }}>Log Out</Typography>
          </Button>
        </Grid>
      </Popover>
    </>
  );
}
