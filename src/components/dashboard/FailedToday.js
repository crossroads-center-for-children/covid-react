import React from 'react';
import { Box, Grid, Typography, Paper, Button } from '@material-ui/core';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export default function FailedToday({ responses }) {
  const responsesThatFailed = responses.filter(response => response.status === 'fail');
  const percentage = responsesThatFailed.length / responses.length;

  return (
    <Paper style={{ width: 300, height: 300 }}>
      <Grid container direction='column' justify='center' alignItems='center' style={{ padding: 10 }}>
        <Typography variant='h5' style={{ fontWeight: 'bold', fontFamily: 'Roboto', marginBottom: 5 }}>
          Failed Today
        </Typography>
        <Box style={{ width: '80%', height: '80%', marginTop: 5, position: 'relative' }}>
          <Typography
            variant='h3'
            style={{
              fontWeight: 'bold',
              fontFamily: 'Roboto',
              fontSize: '5rem',
              position: 'absolute',
              top: '25%',
              left: '40%',
            }}>
            {responsesThatFailed.length}
          </Typography>
          <CircularProgressbar
            value={percentage}
            maxValue={1}
            strokeWidth={20}
            styles={buildStyles({
              rotation: 0.25,
              strokeLinecap: 'round',

              pathTransitionDuration: 2,
              pathColor: `rgba(62, 152, 199, ${percentage})`,

              trailColor: '#ef5350',
            })}
          />
        </Box>
      </Grid>
    </Paper>
  );
}
