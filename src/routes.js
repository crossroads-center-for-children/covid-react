import { Navigate, Outlet } from 'react-router-dom';

import { AdminLayout, LoggedInLayout, MainLayout, UserLayout } from './layouts';

import Login from './pages/Login';
import { Covid, Fail, Pass, UserDashboard } from './pages/user';
import { CheckEmail, ForgotPassword, ResetPassword, SetPassword } from './pages/password';
import { AdminDashboard, Responses, Staff, Students } from './pages/admin';

const routes = (isLoggedIn, isAdmin) => [
  {
    path: '/a',
    element: isLoggedIn ? <Outlet /> : <Navigate to='login' />,
    children: [
      {
        path: 'admin',
        element: isAdmin ? (
          <>
            <AdminLayout />
            <Outlet />
          </>
        ) : (
          <Navigate to='dashboard' />
        ),
        children: [
          { path: '', element: <AdminDashboard /> },
          { path: 'responses', element: <Responses /> },
          { path: 'students', element: <Students /> },
          { path: 'staff', element: <Staff /> },
        ],
      },
      { path: 'dashboard', element: !isAdmin ? <UserDashboard /> : <Navigate to='admin' /> },
      {
        path: 'covid',
        element: !isAdmin ? <Outlet /> : <Navigate to='/admin' />,
        children: [
          { path: '/', element: <Covid /> },
          { path: 'pass', element: <Pass /> },
          { path: 'fail', element: <Fail /> },
        ],
      },

      {
        path: '/',
        element: isAdmin ? <Navigate to='admin' /> : <Navigate to='dashboard' />,
      },
    ],
  },
  {
    path: '/',
    element: !isLoggedIn ? <MainLayout /> : <Navigate to='a' />,
    children: [
      { path: 'login', element: <Login /> },
      {
        path: 'p',
        element: <Outlet />,
        children: [
          { path: 'set', element: <SetPassword /> },
          {
            path: 'forgot',
            element: <Outlet />,
            children: [
              { path: '/', element: <ForgotPassword /> },
              { path: '/check-email', element: <CheckEmail /> },
            ],
          },
          { path: 'reset', element: <ResetPassword /> },
        ],
      },
      { path: '/', element: <Navigate to='login' /> },
    ],
  },
];

export default routes;
