import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, Typography, TextField } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';

import { setUser } from '../../store/auth';
import { navbarHeight } from '../../components/Navbar';
import { RESET_PASSWORD, VALIDATE_RESET_PASSWORD_TOKEN } from '../../graphql/mutations';
import error from '../../images/error.svg';

export default function Set() {
  const [localPassword, setLocalPassword] = useState('');
  const [localPasswordConfirm, setLocalPasswordConfirm] = useState('');
  const [tokenIsValid, setTokenIsValid] = useState(null);

  const { token } = useParams();
  console.log('token', token);

  const navigate = useNavigate();

  const [validateResetPasswordToken] = useMutation(VALIDATE_RESET_PASSWORD_TOKEN, {
    onCompleted(data) {
      const {
        value: { success },
      } = data.validateResetPasswordToken;
      if (success) setTokenIsValid(true);
      else setTokenIsValid(false);
    },
  });

  const [resetPassword] = useMutation(RESET_PASSWORD, {
    onCompleted(data) {
      const { id } = data.resetPassword;
      console.log(data);

      if (id) navigate('/login');
      else {
        alert('Something went wrong. Please try again.');
      }
    },
  });

  useEffect(() => {
    validateResetPasswordToken({ variables: { token } });
  }, [validateResetPasswordToken, token]);

  const handleClick = async () => {
    if (localPassword && localPassword === localPasswordConfirm) {
      resetPassword({ variables: { resetPasswordToken: token, password: localPassword } });
    } else {
      alert('Passwords must match.');
    }
  };

  if (tokenIsValid === null) return null;

  if (tokenIsValid === false)
    return (
      <Grid
        container
        direction='column'
        justify='flex-start'
        alignItems='center'
        style={{
          width: '100vw',
          minHeight: `calc(100vh)`,
          backgroundColor: '#171c28',
        }}>
        <img src={error} style={{ minWidth: 100, marginTop: 100 }} />
        <Typography
          variant='h6'
          style={{
            fontFamily: 'Roboto',
            color: '#f5f5f5',
            fontWeight: 'bold',
            maxWidth: '70%',
            textAlign: 'center',
            marginTop: 20,
          }}>
          This link is invalid or has expired.
        </Typography>
      </Grid>
    );

  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      style={{
        width: '100vw',
        minHeight: `calc(100vh)`,
        backgroundColor: '#171c28',
      }}>
      <Paper
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 280,
          maxWidth: '40%',
          minHeight: 280,
          maxHeight: '40%',
          padding: 10,
        }}>
        <Typography variant='h4' style={{ fontFamily: 'Roboto', width: '70%', fontWeight: 'bold', margin: 10 }}>
          Password Reset
        </Typography>

        <TextField
          value={localPassword}
          onChange={e => setLocalPassword(e.target.value)}
          placeholder='Password'
          fullWidth
          type='password'
          style={{ margin: '10px 0px', width: '70%' }}></TextField>

        <TextField
          value={localPasswordConfirm}
          onChange={e => setLocalPasswordConfirm(e.target.value)}
          placeholder='Confirm Password'
          type='password'
          fullWidth
          style={{ margin: '10px 0px', width: '70%' }}></TextField>

        <Button
          variant='contained'
          color='primary'
          fullWidth
          onClick={handleClick}
          style={{ width: '70%', margin: 10 }}>
          Set Password
        </Button>
      </Paper>
    </Grid>
  );
}
