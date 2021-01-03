import React, { useEffect, useState } from 'react';
import routes from './routes';
import { useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { VALIDATE_TOKEN } from './graphql/mutations';

import { setUser } from './store/auth';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

export function App({ user }) {
  const isLoggedIn = Boolean(user);
  const isAdmin = user && user.type === 'admin' ? true : false;

  const routing = useRoutes(routes(isLoggedIn, isAdmin));
  console.log(isLoggedIn);
  if (isLoggedIn === null) return null;

  return <>{routing}</>;
}

export default function AppWrapper() {
  const dispatch = useDispatch();
  const [curUser, setCurUser] = useState(null);

  const [validateToken] = useMutation(VALIDATE_TOKEN, {
    onCompleted(data) {
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
      setCurUser(user);
    },
    onError(err) {
      console.log(err);
      setCurUser(false);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('going to validate token', token);
    if (token) validateToken({ variables: { token } });
    else setCurUser(false);
  }, [validateToken]);

  if (curUser === null) return null;

  return (
    <ThemeProvider theme={theme}>
      <App user={curUser} />
    </ThemeProvider>
  );
}
