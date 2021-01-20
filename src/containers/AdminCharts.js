import React from 'react';
import { Box } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import { ScreeningsToday, ClearedToday, FailedToday } from '../components/dashboard';
import { GET_SCREENINGS_TODAY } from '../graphql/queries';

export default function AdminCharts() {
  const { loading, error, data } = useQuery(GET_SCREENINGS_TODAY, { variables: { date: 'today' } });

  if (loading || error) return null;

  return (
    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
      <ScreeningsToday responses={data.responses} />
      <ClearedToday responses={data.responses} />
      <FailedToday responses={data.responses} />
    </Box>
  );
}
