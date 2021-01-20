import React from 'react';
import { Box, Grid, Typography, Paper, Button } from '@material-ui/core';
import { CircularProgressbar } from 'react-circular-progressbar';

export default function ScreeningsToday({ responses }) {
  return (
    <Paper style={{ width: 300, height: 300 }}>
      <Grid container direction='column' justify='center' alignItems='center' style={{ padding: 10 }}>
        <Typography variant='h5' style={{ fontWeight: 'bold', fontFamily: 'Roboto', marginBottom: 75 }}>
          Responses Today
        </Typography>
        <Typography
          variant='h3'
          style={{
            fontWeight: 'bold',
            fontFamily: 'Roboto',
            fontSize: '5rem',
          }}>
          {responses.length}
        </Typography>
      </Grid>
    </Paper>
  );
}
