import React, { useEffect, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { VALIDATE_TOKEN } from './graphql/mutations';

import { setUser } from './store/auth';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import Pages from './pages/Pages';

import Index from './pages/Index';
import ResetPassword from './pages/auth/ResetPassword';
import SetPassword from './pages/auth/SetPassword';
import Forgot from './pages/auth/Forgot';
import CheckEmail from './pages/auth/CheckEmail';
import Covid from './pages/Covid';
import Login from './pages/auth/Login';
import Admin from './pages/admin/Admin';
import Pass from './pages/Pass';
import Fail from './pages/Fail';
import Dashboard from './pages/Dashboard';
import Processing from './pages/Processing';

import AdminRoute from './hoc/AdminRoute';

import Navbar, { navbarHeight } from './components/Navbar';

function App() {
  const dispatch = useDispatch();

  const [validateToken] = useMutation(VALIDATE_TOKEN, {
    onCompleted(data) {
      console.log(data);
      const {
        id,
        firstName,
        lastName,
        fullName,
        email,
        phone,
        type,
        children,
        responses,
        responsesSummary,
      } = data.validateToken;

      const user = { id, firstName, lastName, fullName, email, phone, type, children, responses, responsesSummary };

      dispatch(setUser(user));
    },
    onError(err) {
      console.log(err);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('going to validate token', token);
    if (token) validateToken({ variables: { token } });
  }, [validateToken]);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route path='/set/:token' component={SetPassword} />
        <Route path='/reset/:token' component={ResetPassword} />
        <Route path='/forgot' component={Forgot} />
        <Route exact path='/forgot/check-email' component={CheckEmail} />
        <Route component={Pages} />
        <Route path='/' component={Index} />
      </Switch>
    </ThemeProvider>
  );
}

export default withRouter(App);
