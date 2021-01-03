import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import { useStyles } from './styles/Dashboard.styles';
import { drawerWidth } from '../../layouts/styles/Admin.styles';

export default function Dashboard() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography>Dash</Typography>
    </Box>
  );
}
