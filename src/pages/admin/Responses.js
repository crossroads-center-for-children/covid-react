import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import BeatLoader from 'react-spinners/BeatLoader';

import { GET_RESPONSES_LIMIT } from '../../graphql/queries';

import { drawerWidth } from '../../layouts/styles/Admin.styles';
import Responses from '../../tables/Responses/Responses';

export default function ResponsesPage() {
  const [page, setPage] = useState(1);

  const { loading, error, data } = useQuery(GET_RESPONSES_LIMIT, { variables: { limit: 10, page } });

  if (loading)
    return (
      <Box style={{ marginLeft: drawerWidth, width: '100vw', paddingLeft: 50 }}>
        <BeatLoader loading={loading} size={20} color={'#B39DDB'} style={{ marginLeft: drawerWidth }} />
      </Box>
    );

  if (error) return null;

  if (data) console.log(data);

  return (
    <Box
      style={{
        marginLeft: drawerWidth,
        width: `calc(100vw - ${drawerWidth}px - 40px)`,
        paddingLeft: 20,
        paddingRight: 20,
      }}>
      <Typography variant='h4' style={{ fontWeight: 'bold', fontFamily: 'Roboto', marginBottom: 20 }}>
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

      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Prev
      </Button>

      <Button onClick={() => setPage(page + 1)} disabled={data.responses.length < 10}>
        Next
      </Button>
    </Box>
  );
}
