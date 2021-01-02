import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@material-ui/core';

import { drawerWidth } from '../../layouts/styles/Admin.styles';

export default function Students() {
  return (
    <Box style={{ marginLeft: drawerWidth, width: '100vw' }}>
      <Typography>Students</Typography>
    </Box>
  );
}
