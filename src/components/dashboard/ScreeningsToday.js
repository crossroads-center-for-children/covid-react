import React, { useState } from 'react';
import { Box, Grid, Typography, Paper, Button, Popover } from '@material-ui/core';
import { CircularProgressbar } from 'react-circular-progressbar';

export default function ScreeningsToday({ responses }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = e => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const isOpen = Boolean(anchorEl);

  return (
    <Paper style={{ width: 300, height: 300 }}>
      <Grid container direction='column' justify='center' alignItems='center' style={{ padding: 10 }}>
        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Typography variant='h5' style={{ fontWeight: 'bold', fontFamily: 'Roboto', marginBottom: 75 }}>
            Responses Today
          </Typography>
          <Button style={{ minWidth: 10, maxWidth: 10, height: 10 }} disabled={responses.length === 0}>
            <i
              class='fas fa-info-circle'
              style={{ marginLeft: 5, color: responses.length === 0 ? '#ffffff' : '#bdbdbd' }}
              onClick={handleClick}></i>
          </Button>
          <Popover open={isOpen} onClose={handleClose} anchorEl={anchorEl}>
            <Box>
              <Typography>
                {Object.entries(
                  responses.reduce((accum, response) => {
                    if (!accum[response.user]) accum[response.user] = response;
                    return accum;
                  }, {})
                )
                  .map(response => response[1].user)
                  .join(', ')}
              </Typography>
            </Box>
          </Popover>
        </Box>
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
