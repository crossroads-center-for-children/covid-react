import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { getUserFromEmail } from '../../lib/user';
import { navbarHeight } from '../../components/Navbar';
import { useMutation } from '@apollo/client';
import { FORGOT_PASSWORD } from '../../graphql/mutations';

export default function Forgot() {
  const [email, setEmail] = useState('');

  const [forgotPassword] = useMutation(FORGOT_PASSWORD, {
    onCompleted(data) {
      const { id } = data.forgotPassword;

      if (id) {
        alert('Good news! We found your account and just emailed you a link to reset your password.');
      } else {
        alert("We couldn't find your account. Please try again with a different email address.");
      }
    },
  });

  const handleSubmit = async () => {
    if (email) {
      try {
        forgotPassword({ variables: { email } });
      } catch (err) {
        console.log(err);
      }
    }
  };

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
        <Typography variant='h6' style={{ fontFamily: 'Roboto', width: '70%', margin: 10 }}>
          Forgot your password?
        </Typography>

        <Typography variant='caption' style={{ fontFamily: 'Roboto', width: '70%', margin: 10 }}>
          All you need to do is enter your email address. Then we will send you a link to reset your password.
        </Typography>

        <TextField
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Email'
          style={{ margin: '10px 0px', width: '70%' }}
        />

        <Button
          variant='contained'
          color='primary'
          fullWidth
          onClick={handleSubmit}
          style={{ width: '70%', margin: 10 }}>
          Submit
        </Button>
      </Paper>
    </Grid>
  );
}
