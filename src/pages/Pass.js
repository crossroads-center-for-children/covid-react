import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import checkmark from '../checkmark.svg';
import { navbarHeight } from '../components/Navbar';

export default function Pass() {
  const response = useSelector(state => state.response);
  const user = useSelector(state => state.auth.user);

  const [type, setType] = useState(null);
  const [relevant, setRelevant] = useState(null);
  const [date, setDate] = useState(null);

  const history = useHistory();

  useEffect(() => {
    if (response.hasOwnProperty('relevant') && user.hasOwnProperty('type')) {
      setRelevant(response.relevant);
      setDate(new Date(response.date).toLocaleDateString());
      setType(user.type);
    } else {
      history.push('/dashboard');
    }
  }, [response, history, user]);

  if (!type) return null;

  return (
    <Box
      style={{
        padding: 10,
        display: 'flex',

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: navbarHeight,
      }}>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: 300,
          padding: 20,
        }}>
        <img src={checkmark} style={{ width: 100, marginBottom: 20 }} />

        <Typography variant='h5' style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>
          All set!
        </Typography>

        <br></br>

        <Typography variant='body1' style={{ fontFamily: 'Roboto', textAlign: 'center' }}>
          {type === 'parent'
            ? `${relevant.firstName} is cleared to come to Crossroads on ${date}`
            : `You are cleared for ${date}`}
        </Typography>
      </Box>
    </Box>
  );
}
