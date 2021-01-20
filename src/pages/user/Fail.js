import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import error from '../../images/error.svg';
import { navbarHeight } from '../../components/Navbar';

export default function Fail() {
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
      justify='space-between'
      alignItems='center'
      style={{
        width: '100vw',
        minHeight: `calc(100vh - 75px)`,
        backgroundColor: '#171c28',
        marginTop: 75,
        paddingTop: 75,
      }}>
      <img src={error} style={{ width: 80 }} />
      <Typography
        variant='h4'
        style={{ fontWeight: 'bold', fontFamily: 'Roboto', textAlign: 'center', color: '#f5f5f5', marginTop: 20 }}>
        Oh no!
      </Typography>

      <Paper style={{ fontFamily: 'Roboto', margin: 30, padding: 20 }}>
        <Grid container direction='column' justify='space-between' alignItems='center'>
          <Box style={{ padding: 20 }}>
            <Typography variant='body1'>{`${user.firstName},`}</Typography>
            <br></br>
            <Typography variant='body1'>
              <span>{type === 'parent' ? `${relevant.firstName} is not ` : `You are not `}</span>cleared to come to
              Crossroads on {date}.
            </Typography>
            <br></br>
            <Typography variant='body1'>
              {type === 'parent' ? `We just notified Crossroads.` : `We just notified Crossroads.`}
            </Typography>
            <br></br>
            <Typography variant='body1'>
              Please contact your primary care physician or{' '}
              <span>
                <a href='https://coronavirus.health.ny.gov/home'>State Department of Health </a>
              </span>
              for further instruction.
            </Typography>
            <br></br>
            <Typography variant='body1'>
              {type === 'parent' ? `We hope ${relevant.firstName} feels better soon!` : `We hope you feel better soon!`}
            </Typography>
            <br></br>
            <Typography variant='body1'>Best,</Typography>
            <Typography variant='body1'>Crossroads</Typography>
          </Box>
        </Grid>
      </Paper>
    </Grid>
  );
}
