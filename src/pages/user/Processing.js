import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import { useLocation, useNavigate } from 'react-router-dom';

import { handleResponse } from '../../lib/response';
import { navbarHeight } from '../../components/Navbar';
import GridLoader from 'react-spinners/GridLoader';
import { useMutation } from '@apollo/client';

export default function Processing() {
  const location = useLocation();
  const { user, response, responseId } = location.state;
  const navigate = useNavigate();
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

  if (!showLoading && isCleared && success) navigate('/a/covid/pass');
  if (!showLoading && !isCleared && success) navigate('/a/covid/fail');
  if (!showLoading && !success) navigate('/a/covid/error');

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
