import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, Popover, Typography } from '@material-ui/core';

import QRCode from 'qrcode.react';

import { navbarHeight } from '../../components/Navbar';

export default function Dashboard() {
  const token = useSelector(state => state.auth.token);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = e => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box
      style={{
        backgroundColor: '#171c28',
        height: '100vh',
        margin: 0,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Button
        variant='contained'
        color='primary'
        href='/a/covid'
        size='large'
        style={{ width: 200, height: 200, margin: 20 }}>
        <Typography variant='h4' style={{ textAlign: 'center', fontFamily: 'Roboto', fontWeight: 'bold' }}>
          COVID-19 Screener
        </Typography>
      </Button>

      <Button
        onClick={handleOpen}
        variant='contained'
        size='large'
        style={{ width: 200, height: 200, margin: 20, backgroundColor: '#15E6A9' }}>
        <Typography variant='h4' style={{ textAlign: 'center', fontFamily: 'Roboto', fontWeight: 'bold' }}>
          Get QR Code
        </Typography>
      </Button>

      <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
        <Box>
          <QRCode
            size={200}
            value={
              process.env.NODE_ENV === 'production'
                ? 'https://crossroads-center.herokuapp.com/a/covid'
                : 'http://localhost:3000/a/covid'
            }
          />
        </Box>
      </Popover>
    </Box>
  );
}
