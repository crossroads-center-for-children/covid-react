import { Navigate, Outlet } from 'react-router-dom';

import { AdminLayout, LoggedInLayout, MainLayout, UserLayout } from './layouts';

import Login from './pages/Login';
import { Covid, Processing, Fail, Pass, UserDashboard } from './pages/user';
import { CheckEmail, ForgotPassword, ResetPassword, SetPassword } from './pages/password';
import { AdminDashboard, Parents, Responses, Staff, Students } from './pages/admin';

const routes = (isLoggedIn, isAdmin) => [
  {
    path: '/a',
    element: isLoggedIn ? (
      <>
        <LoggedInLayout />
        <Outlet />
      </>
    ) : (
      <Navigate to='/login' />
    ),
    children: [
      {
        path: 'admin',
        element: isAdmin ? (
          <>
            <AdminLayout />
            <Outlet />
          </>
        ) : (
          <Navigate to='/a/dashboard' />
        ),
        children: [
          { path: '', element: <AdminDashboard /> },
          { path: 'responses', element: <Responses /> },
          { path: 'students', element: <Students /> },
          { path: 'staff', element: <Staff /> },
          { path: 'parents', element: <Parents /> },
        ],
      },
      { path: 'dashboard', element: !isAdmin ? <UserDashboard /> : <Navigate to='/a/admin' /> },
      {
        path: 'covid',
        element: !isAdmin ? <Outlet /> : <Navigate to='/a/admin' />,
        children: [
          { path: '/', element: <Covid /> },
          { path: 'processing', element: <Processing /> },
          { path: 'pass', element: <Pass /> },
          { path: 'fail', element: <Fail /> },
        ],
      },

      {
        path: '/',
        element: isAdmin ? <Navigate to='/a/admin' /> : <Navigate to='/a/dashboard' />,
      },
    ],
  },
  { path: '/dashboard', element: isLoggedIn ? <Navigate to='/a/dashboard' /> : <Navigate to='login' /> },
  {
    path: '/',
    element: !isLoggedIn ? (
      <>
        <MainLayout />
        <Outlet />
      </>
    ) : (
      <Navigate to='a' />
    ),
    children: [
      {
        path: 'login',
        element: (
          <>
            <Login />
            <Outlet />
          </>
        ),
      },
      {
        path: 'p',
        element: <Outlet />,
        children: [
          {
            path: 'set/:token',
            element: (
              <>
                <SetPassword />
                <Outlet />
              </>
            ),
          },
          {
            path: 'forgot',
            element: <Outlet />,
            children: [
              {
                path: '/',
                element: (
                  <>
                    <ForgotPassword />
                    <Outlet />
                  </>
                ),
              },
              {
                path: '/check-email',
                element: (
                  <>
                    <CheckEmail />
                    <Outlet />
                  </>
                ),
              },
            ],
          },
          {
            path: 'reset/:token',
            element: (
              <>
                <ResetPassword />
                <Outlet />
              </>
            ),
          },
        ],
      },
      { path: '/', element: <Navigate to='login' /> },
    ],
  },
];

export default routes;
