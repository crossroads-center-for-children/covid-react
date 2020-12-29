import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function Redirect() {
  const history = useHistory();
  const user = useSelector(state => state.auth.user) || false;

  useEffect(() => {
    if (user) {
      if (user['type'] === 'admin') history.push('/admin');
      else history.push('/covid');
    }
  }, [user, history]);

  return (
    <Box>
      <Typography>Redirecting</Typography>
    </Box>
  );
}
