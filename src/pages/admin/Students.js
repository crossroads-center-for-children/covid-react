import React, { useEffect, useState } from 'react';
import { Box, Button, Chip, Paper, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import BeatLoader from 'react-spinners/BeatLoader';
import Students from '../../tables/Students/Students';

import { GET_STUDENTS_LIMIT } from '../../graphql/queries';

import { drawerWidth } from '../../layouts/styles/Admin.styles';
import { useStyles } from './styles/Students.styles';
import { Link } from 'react-router-dom';

export default function StudentsPage() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_STUDENTS_LIMIT, { variables: { limit: 10 } });

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
        Students
      </Typography>

      <Box>
        {data.students.length > 0 ? (
          <Students students={data.students} />
        ) : (
          <Box>
            <Typography>No responses were found.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
