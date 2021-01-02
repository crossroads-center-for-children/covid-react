import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import processing from '../processing-responses.svg';
import { handleResponse } from '../lib/response';
import { navbarHeight } from '../components/Navbar';
import GridLoader from 'react-spinners/GridLoader';
import { useMutation } from '@apollo/client';

export default function Processing() {
  const location = useLocation();
  const { user, response, responseId } = location.state;
  const history = useHistory();
  const [showLoading, setShowLoading] = useState(true);
  const [isCleared, setIsCleared] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => setShowLoading(false), 1000);

    return () => {
      clearTimeout(timer);
    };
  });

  useEffect(() => {
    (async () => {
      const { isCleared, success } = await handleResponse(user, response, responseId);
      setIsCleared(isCleared);
      setSuccess(success);
    })();
  });

  if (!showLoading && isCleared && success) history.push('/pass');
  if (!showLoading && !isCleared && success) history.push('/fail');
  if (!showLoading && !success) history.push('/error');

  return (
    <Box
      style={{
        marginTop: navbarHeight,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Box>
        <GridLoader loading={true} size={20} color={'#B39DDB'} />
      </Box>

      <br></br>

      <Typography variant='b1' style={{ fontFamily: 'Roboto', textAlign: 'center' }}>
        Processing your responses...
      </Typography>
    </Box>
  );
}
