import React, { useEffect, useState } from 'react';
import { Box, Button, Chip, Paper, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import BeatLoader from 'react-spinners/BeatLoader';
import Staff from '../../tables/Staff/Staff';

import { GET_CLINICAL_STAFF } from '../../graphql/queries';

import { drawerWidth } from '../../layouts/styles/Admin.styles';
import { useStyles } from './styles/Students.styles';
import { Link } from 'react-router-dom';

export default function StaffPage() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_CLINICAL_STAFF, { variables: { type: 'clinical' } });

  if (loading)
    return (
      <Box>
        <BeatLoader loading={loading} size={20} color={'#B39DDB'} style={{ marginLeft: drawerWidth }} />
      </Box>
    );

  if (error) return null;

  return (
    <Box className={classes.root}>
      <Typography variant='h5' style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>
        Staff
      </Typography>

      <Box>
        {data.users.length > 0 ? (
          <Staff staff={data.users} />
        ) : (
          <Box>
            <Typography>No staff were found.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
