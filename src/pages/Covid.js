import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@material-ui/core';

export default function Covid() {
  return (
    <Box>
      <Paper>
        <TextField placeholder='Symptom'></TextField>
      </Paper>
    </Box>
  );
}
