import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, useHistory, withRouter, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import { validateToken } from './store/auth';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import Covid from './pages/Covid';
import Index from './pages/Index';
import Login from './pages/auth/Login';
import Admin from './pages/Admin';
import Redirect from './pages/auth/Redirect';
import Success from './pages/Success';
import Navbar from './components/Navbar';
import Reset from './pages/auth/Reset';
import Forgot from './pages/auth/Forgot';
import CheckEmail from './pages/auth/CheckEmail';

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(useParams());
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && dispatch(validateToken(token))) history.push('/redirect');
    else if (!location.pathname.includes('reset')) {
      history.push('/login');
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/covid' component={Covid} />
        <Route exact path='/admin' component={Admin} />
        <Route exact path='/redirect' component={Redirect} />
        <Route exact path='/success' component={Success} />
        <Route path='/reset/:token' component={Reset} />
        <Route path='/forgot' component={Forgot} />
        <Route exact path='/forgot/check-email' component={CheckEmail} />
        <Route path='/' component={Index} />
      </Switch>
    </ThemeProvider>
  );
}

export default withRouter(App);
