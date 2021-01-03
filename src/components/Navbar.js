import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Box, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from './styles/Navbar.styles';
import crossroads from '../images/crossroads.svg';
import Avatar from './Avatar';

export const navbarHeight = 100;

export default function Navbar() {
  const classes = useStyles();
  const user = useSelector(state => state.auth.user) || false;

  console.log(user);

  return (
    <AppBar className={user.type === 'admin' ? classes['root--admin'] : classes['root--user']}>
      <Link to='/'>
        <img src={crossroads} style={{ width: 125, display: user.type === 'admin' ? 'none' : 'block' }} />
      </Link>
      <Box>{user ? <Avatar user={user} /> : null}</Box>
    </AppBar>
  );
}
