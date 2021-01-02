import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Box, Button, Link, Typography } from '@material-ui/core';
import crossroads from '../crossroads.svg';

export const navbarHeight = 50;

export default function Navbar() {
  const user = useSelector(state => state.auth.user) || false;

  return (
    <AppBar
      style={{
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        height: navbarHeight,
        boxShadow: 'none',
      }}>
      <Link href='http://crossroadcenter.org/'>
        <img src={crossroads} style={{ height: 50 }} />
      </Link>
      <Box>
        {user ? (
          <Link href='/dashboard' underline='none'>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
              <i class='fas fa-user-circle fa-lg' style={{ color: '#156FE5' }}></i>
              <Typography style={{ fontFamily: 'Roboto', color: '#414141', marginLeft: 5 }}>
                {user.firstName}
              </Typography>
            </Box>
          </Link>
        ) : null}
      </Box>
    </AppBar>
  );
}
