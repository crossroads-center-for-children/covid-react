import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../puzzlepiece.png';
import { login } from '../../store/auth';
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
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    let token;

    (async () => {
      token = dispatch(login({ identifier, password }));
      console.log(token);
    })();

    if (token) {
      console.log(token);
      history.push('/redirect');
    }
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
            value={identifier}
            style={{ width: '100%', margin: 5 }}
            onChange={e => setIdentifier(e.target.value)}
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
