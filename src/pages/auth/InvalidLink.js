import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import error from '../../error.svg';

export default function InvalidLink() {
  return (
    <Box>
      <img src={error} />
      <Typography>This link is expired or invalid</Typography>
    </Box>
  );
}
