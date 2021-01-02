import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function AdminRoute({ component: Component, isAdmin, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAdmin) return <Component user={user} />;
        else return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
      }}
    />
  );
}
