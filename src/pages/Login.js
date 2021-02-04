import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../images/puzzlepiece.png';
import { LOGIN_USER } from '../graphql/mutations';

import { setUser } from '../store/auth';

import { useMutation } from '@apollo/client';

import { navbarHeight } from '../components/Navbar';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#171c28',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px 20px',
    height: '100vh',
  },

  paper: {
    padding: 10,
    minWidth: 280,
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
  const navigate = useNavigate();

  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();

  const [login] = useMutation(LOGIN_USER, {
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
      } = data.login;

      const user = { id, firstName, lastName, fullName, email, phone, children, responses, responsesSummary };

      localStorage.setItem('token', token);

      dispatch(setUser(user));
      window.location.reload();
    },

    onError(err) {
      alert('Invalid email or password.');
    },
  });

  const handleSubmit = () => {
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
        <img src={logo} width='150px' height='150px' />
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
          <Link to='/p/forgot'>
            <Typography variant='body2' style={{ fontFamily: 'Roboto', textAlign: 'center', marginTop: 10 }}>
              Forgot Password?
            </Typography>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}
