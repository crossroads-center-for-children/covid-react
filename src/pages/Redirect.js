import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function Redirect() {
  const history = useHistory();
  const user = useSelector(state => state.auth.user) || false;

  const date = new Date();
  const yearIdx = date.getYear() + 1900;
  const dateIdx = date.getDate();
  const monthIdx = date.getMonth() + 1;

  useEffect(() => {
    if (user) {
      if (user['type'] === 'admin') history.push('/admin');
      else if (
        user.summary &&
        user.summary[yearIdx] &&
        user.summary[yearIdx][monthIdx] &&
        user.summary[yearIdx][monthIdx][dateIdx]
      )
        history.push('/dashboard');
      else history.push('/covid');
    }
  }, [user, history, yearIdx, dateIdx, monthIdx]);

  return (
    <Box>
      <Typography>Redirecting</Typography>
    </Box>
  );
}
