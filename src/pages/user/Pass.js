import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import checkmark from '../../images/checkmark.svg';
import { navbarHeight } from '../../components/Navbar';

export default function Pass() {
  const response = useSelector(state => state.response);
  const user = useSelector(state => state.auth.user);

  const [type, setType] = useState(null);
  const [relevant, setRelevant] = useState(null);
  const [date, setDate] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (response.hasOwnProperty('relevant') && user.hasOwnProperty('type')) {
      setRelevant(response.relevant);
      setDate(new Date(response.date).toLocaleDateString());
      setType(user.type);
    } else {
      navigate('/dashboard');
    }
  }, [response, navigate, user]);

  if (!type) return null;

  return (
    <Grid
      container
      direction='column'
      justify='flex-start'
      alignItems='center'
      style={{
        width: '100vw',
        minHeight: `calc(100vh - 75px)`,
        backgroundColor: '#171c28',
        marginTop: 75,
        paddingTop: 75,
      }}>
      <img src={checkmark} style={{ width: 100, marginBottom: 20 }} />

      <Typography
        variant='h4'
        style={{ fontWeight: 'bold', fontFamily: 'Roboto', textAlign: 'center', color: '#f5f5f5', marginTop: 20 }}>
        All set!
      </Typography>

      <Paper style={{ fontFamily: 'Roboto', margin: 30, padding: 20 }}>
        <Typography variant='body1'>{`${user.firstName},`}</Typography>
        <br></br>

        <Typography variant='body1' style={{ fontFamily: 'Roboto' }}>
          {type === 'parent'
            ? `${relevant.firstName} is cleared to come to Crossroads on ${date}.`
            : `You are cleared to come to Crossroads on ${date}.`}
        </Typography>

        <br></br>

        <Typography variant='body1'>Best,</Typography>
        <Typography variant='body1'>Crossroads</Typography>
      </Paper>
    </Grid>
  );
}
