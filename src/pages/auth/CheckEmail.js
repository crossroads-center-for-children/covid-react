import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import pluto from '../../checkemail.svg';

export default function CheckEmail() {
  return (
    <Paper>
      <img src={pluto} />

      <Typography>Check your mail for link to reset your password</Typography>
    </Paper>
  );
}
