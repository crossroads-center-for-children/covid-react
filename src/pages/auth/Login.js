import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../puzzlepiece.png';
import { LOGIN_USER } from '../../graphql/mutations';

import { setUser } from '../../store/auth';

import { useMutation } from '@apollo/client';

import { navbarHeight } from '../../components/Navbar';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: navbarHeight,
  },

  paper: {
    padding: 10,
    minWidth: 300,
  },

  form__box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  actions__box: {
    marginTop: 5,
  },

  button__text: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
}));

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();
  const history = useHistory();

  const user = useSelector(state => state.auth.user) || false;

  const dispatch = useDispatch();

  const [login] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      console.log(data);
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
      } = data.login;

      const user = { id, firstName, lastName, fullName, email, phone, children, responses, responsesSummary };

      localStorage.setItem('token', token);

      dispatch(setUser(user));

      console.log(user);
    },
  });

  useEffect(() => {
    if (user) {
      history.push('/dashboard');
    }
  }, [user, history]);

  const handleSubmit = () => {
    console.log('hitting before mutation');
    login({
      variables: {
        email,
        password,
      },
    });
  };

  return (
    <Box className={classes.root}>
      <Box>
        <img src={logo} width='120px' height='120px' />
      </Box>
      <Paper className={classes.paper}>
        <Box className={classes.form__box}>
          <TextField
            variant='outlined'
            placeholder='Email or username'
            value={email}
            style={{ width: '100%', margin: 5 }}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant='outlined'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', margin: 5 }}
            type='password'
          />
        </Box>
        <Box className={classes.actions__box}>
          <Button variant='contained' color='primary' fullWidth style={{ width: '100%' }} onClick={handleSubmit}>
            <Typography className={classes.button__text}>Log In</Typography>
          </Button>
        </Box>
        <Box>
          <Link to='/forgot'>
            <Typography style={{ fontFamily: 'Roboto' }}>Forgot Password?</Typography>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}
