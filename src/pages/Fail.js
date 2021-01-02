import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import error from '../error.svg';
import { navbarHeight } from '../components/Navbar';

export default function Pass() {
  const response = useSelector(state => state.response);
  const user = useSelector(state => state.auth.user);

  const [type, setType] = useState(null);
  const [relevant, setRelevant] = useState(null);
  const [date, setDate] = useState(null);

  const history = useHistory();

  useEffect(() => {
    if (response.hasOwnProperty('relevant') && user.hasOwnProperty('type')) {
      setRelevant(response.relevant);
      setDate(new Date(response.date).toLocaleDateString());
      setType(user.type);
    } else {
      history.push('/dashboard');
    }
  }, [response, history, user]);

  if (!type) return null;

  return (
    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 300,
          maxWidth: 500,
          marginTop: navbarHeight,
          padding: 20,
        }}>
        <img src={error} style={{ width: 70, marginBottom: 20 }} />

        <Typography variant='h5' style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>
          Oh no!
        </Typography>

        <Box style={{ fontFamily: 'Roboto' }}>
          <Box>
            <br></br>
            <Typography>
              <span>{type === 'parent' ? `${relevant.firstName} is not ` : `You are not `}</span>cleared to come to
              Crossroads on {date}.
            </Typography>
            <br></br>
            <Typography>The appropriate people at Crossroads are being notified.</Typography>
            <br></br>
            <Typography>
              Please contact your primary care physician or{' '}
              <span>
                <a href='https://coronavirus.health.ny.gov/home'>State Department of Health </a>
              </span>
              for further instruction.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
