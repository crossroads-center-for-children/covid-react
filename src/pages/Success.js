import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import checkmark from '../checkmark.svg';
export default function Success() {
  return (
    <Box
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Paper
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: 300,
          padding: 20,
        }}>
        <img src={checkmark} style={{ width: 150, marginBottom: 20 }} />

        <Typography variant='h5' style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>
          Thank You!
        </Typography>

        <Typography variant='body1' style={{ fontFamily: 'Roboto' }}>
          Your response has been saved.
        </Typography>
      </Paper>
    </Box>
  );
}
