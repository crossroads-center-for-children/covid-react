import React, { useEffect, useState } from 'react';
import { Box, Button, Chip, Paper, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import BeatLoader from 'react-spinners/BeatLoader';
import Parents from '../../tables/Parents/Parents';

import { GET_PARENTS } from '../../graphql/queries';

import { drawerWidth } from '../../layouts/styles/Admin.styles';
import { useStyles } from './styles/Students.styles';
import { Link } from 'react-router-dom';

export default function ParentsPage() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_PARENTS, { variables: { type: 'parent' } });

  if (loading)
    return (
      <Box>
        <BeatLoader loading={loading} size={20} color={'#B39DDB'} style={{ marginLeft: drawerWidth }} />
      </Box>
    );

  if (error) return null;

  if (data) console.log(data);

  return (
    <Box className={classes.root}>
      <Typography variant='h5' style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>
        Parents
      </Typography>

      <Box>
        {data.users.length > 0 ? (
          <Parents parents={data.users} />
        ) : (
          <Box>
            <Typography>No parents were found.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
