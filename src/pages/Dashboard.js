import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';

import { navbarHeight } from '../components/Navbar';

export default function Dashboard() {
  const history = useHistory();
  const user = useSelector(state => state.auth.user);

  if (!user) history.push('/login');
  return (
    <Box
      style={{
        marginTop: navbarHeight,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Button variant='contained' color='primary' href='/covid' size='large'>
        <Typography style={{ textAlign: 'center' }}>Complete COVID-19 Questionnaire</Typography>
      </Button>
    </Box>
  );
}
