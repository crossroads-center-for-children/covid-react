import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard';
import Covid from './Covid';
import Processing from './Processing';
import Pass from './Pass';
import Fail from './Fail';

import Admin from './admin/Admin';
import AdminRoute from '../hoc/AdminRoute';

export default function Pages() {
  const user = useSelector(state => state.auth.user);
  console.log(user);

  if (!user) return null;

  return (
    <Switch>
      <AdminRoute exact path='/admin' component={Admin} isAdmin={user.type === 'admin' ? true : false} user={user} />
      <Route exact path='/dashboard' component={Dashboard} />
      <Route exact path='/covid' component={Covid} />
      <Route exact path='/covid/processing' component={Processing} />
      <Route exact path='/pass' component={Pass} />
      <Route exact path='/fail' component={Fail} />
    </Switch>
  );
}
