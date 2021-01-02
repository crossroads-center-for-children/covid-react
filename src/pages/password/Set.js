import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography, TextField } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';

import { setUser } from '../../store/auth';
import { navbarHeight } from '../../components/Navbar';
import { SET_PASSWORD, VALIDATE_RESET_PASSWORD_TOKEN } from '../../graphql/mutations';
import error from '../../images/error.svg';

export default function Set() {
  const [localPassword, setLocalPassword] = useState('');
  const [localPasswordConfirm, setLocalPasswordConfirm] = useState('');
  const [tokenIsValid, setTokenIsValid] = useState(null);

  const { token } = useParams();

  // const history = useHistory();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [validateResetPasswordToken] = useMutation(VALIDATE_RESET_PASSWORD_TOKEN, {
    onCompleted(data) {
      const {
        value: { success },
      } = data.validateResetPasswordToken;
      if (success) setTokenIsValid(true);
      else setTokenIsValid(false);
    },
  });

  const [setPassword] = useMutation(SET_PASSWORD, {
    onCompleted(data) {
      const {
        id,
        firstName,
        lastName,
        fullName,
        email,
        phone,
        children,
        responses,
        responsesSummary,
        token,
      } = data.setPassword;

      const user = { id, firstName, lastName, fullName, email, phone, children, responses, responsesSummary };

      localStorage.setItem('token', token);

      dispatch(setUser(user));

      navigate('/dashboard');
    },
  });

  useEffect(() => {
    validateResetPasswordToken({ variables: { token } });
  }, [validateResetPasswordToken, token]);

  const handleClick = async () => {
    if (localPassword && localPassword === localPasswordConfirm) {
      setPassword({ variables: { resetPasswordToken: token, password: localPassword } });
    } else {
      alert('Passwords must match.');
    }
  };

  if (tokenIsValid === null) return null;

  if (tokenIsValid === false)
    return (
      <Box
        style={{
          marginTop: navbarHeight,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '99vw',
          height: `calc(99vh - ${navbarHeight}px)`,
          padding: '100px 0px',
        }}>
        <Box
          style={{
            minWidth: 300,
            maxWidth: 600,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <img src={error} style={{ maxWidth: 300 }} />
          <Box style={{ marginTop: 20 }}>
            <Typography variant='h6' style={{ fontFamily: 'Roboto' }}>
              This link is invalid or has expired.
            </Typography>
          </Box>
        </Box>
      </Box>
    );

  return (
    <Box
      style={{
        marginTop: navbarHeight,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: `calc(100vh - ${navbarHeight}px)`,
      }}>
      <Paper
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 300,
          maxWidth: '40%',
          minHeight: 300,
          maxHeight: 600,
          padding: 20,
        }}>
        <Typography variant='h5' style={{ fontFamily: 'Roboto', fontWeight: 'bold' }}>
          Welcome!
        </Typography>
        <Typography variant='body1' style={{ fontFamily: 'Roboto', width: '70%' }}>
          Please set your password. We will redirect you afterward.
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

        <Button variant='contained' color='primary' fullWidth onClick={handleClick} style={{ width: '70%' }}>
          Set Password
        </Button>
      </Paper>
    </Box>
  );
}
