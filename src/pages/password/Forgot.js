import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@material-ui/core';
import { getUserFromEmail } from '../../lib/user';
import { navbarHeight } from '../../components/Navbar';
// import { useHistory } from 'react-router-dom';

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);

  // const history = useHistory();

  const handleSubmit = async () => {
    if (email) {
      try {
        const userId = await getUserFromEmail(email);
        console.log(userId);
        // const { resetToken } = await setResetPasswordToken(userId);
        // history.push(`/reset/${resetToken}`);
        // console.log(resetToken);
      } catch (err) {
        console.log(err);
        setErrors(err);
      }
    }
  };

  return (
    <Box
      style={{
        marginTop: navbarHeight,
        backgroundColor: 'black',
        width: '100vw',
        height: `calc(100vh - ${navbarHeight}px)`,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Paper
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <TextField value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' />

        <Button fullWidth variant='contained' color='primary' onClick={handleSubmit}>
          <Typography>Submit</Typography>
        </Button>
      </Paper>
    </Box>
  );
}
