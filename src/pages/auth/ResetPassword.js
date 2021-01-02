import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography, TextField } from '@material-ui/core';

import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser } from '../../store/auth';

import { navbarHeight } from '../../components/Navbar';
import { validateResetPasswordToken, resetPassword } from '../../lib/user';
import pluto from '../../error.svg';

export default function Reset() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [userId, setUserId] = useState('');
  const [errors, setErrors] = useState([]);

  const { token } = useParams();

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const userId = await validateResetPasswordToken(token);
        console.log(userId);
        if (userId) setUserId(userId);
      } catch (err) {
        setErrors(['This link has expired or is invalid.']);
      }
    })();
  }, []);

  const handleClick = async () => {
    if (password && password === passwordConfirm) {
      const { user, jwt } = await resetPassword(password, passwordConfirm, token);
      console.log(user, jwt);
      dispatch(loadUser(jwt));
    }
  };

  if (errors.length > 0)
    return (
      <Box
        style={{
          marginTop: navbarHeight,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: `calc(100vh - ${navbarHeight}px)`,
        }}>
        <Paper
          style={{
            padding: 20,
            minWidth: 300,
            maxWidth: 600,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <img src={pluto} style={{ width: 80 }} />
          <Box style={{ marginTop: 20 }}>
            {errors.map(error => (
              <Typography variant='h6' style={{ fontFamily: 'Roboto' }}>
                {error}
              </Typography>
            ))}
          </Box>
        </Paper>
      </Box>
    );

  if (!userId) return null;

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
      <Paper style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 300, maxWidth: 600 }}>
        <TextField
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password'
          type='password'></TextField>

        <TextField
          value={passwordConfirm}
          onChange={e => setPasswordConfirm(e.target.value)}
          placeholder='Confirm Password'></TextField>

        <Button variant='contained' color='primary' fullWidth onClick={handleClick}>
          Reset Password
        </Button>
      </Paper>
    </Box>
  );
}
