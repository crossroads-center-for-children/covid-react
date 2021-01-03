import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import BeatLoader from 'react-spinners/BeatLoader';

import { GET_RESPONSES_LIMIT } from '../../graphql/queries';

import { drawerWidth } from '../../layouts/styles/Admin.styles';
import Responses from '../../tables/Responses/Responses';

export default function ResponsesPage() {
  const { loading, error, data } = useQuery(GET_RESPONSES_LIMIT, { variables: { limit: 50 } });

  if (loading)
    return (
      <Box>
        <BeatLoader loading={loading} size={20} color={'#B39DDB'} style={{ marginLeft: drawerWidth }} />
      </Box>
    );

  if (error) return null;

  if (data) console.log(data);

  return (
    <Box style={{ marginLeft: drawerWidth, width: '100vw' }}>
      <Typography variant='h5' style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>
        Responses
      </Typography>

      <Box>
        {data.responses.length > 0 ? (
          <Responses responses={data.responses} />
        ) : (
          <Box>
            <Typography>No responses were found.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
