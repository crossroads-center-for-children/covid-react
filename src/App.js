import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, useHistory, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import { validateToken } from './store/auth';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import Covid from './pages/Covid';
import Index from './pages/Index';
import Login from './pages/Login';

function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && dispatch(validateToken(token))) history.push('/covid');
    else history.push('login');
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/covid' component={Covid} />
        <Route path='/' component={Index} />
      </Switch>
    </ThemeProvider>
  );
}

export default withRouter(App);
