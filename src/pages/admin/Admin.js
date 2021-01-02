import React from 'react';
import { useHistory, Route, Switch } from 'react-router-dom';
import { Box, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';

import { navbarHeight } from '../../components/Navbar';

import { useStyles } from './Admin.styles';
import logo from '../../puzzlepiece.png';

export default function Admin({ user }) {
  const classes = useStyles();

  const listItems = [
    ['📊', 'Dashboard', '/admin/dashboard', false],
    ['🗄️', 'Responses', '/admin/responses', false],
    ['🚌', 'Students', '/admin/students', false],
    ['🧑‍⚕️', 'Clinical Staff', '/admin/clinical-staff', false],
  ];

  return (
    <Box style={{ marginTop: navbarHeight }}>
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor='left'>
        <Box className={classes.toolbar} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <img src={logo} style={{ width: 75 }} />
        </Box>

        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
          }}>
          <List>
            {listItems.map(item => (
              <Box className={classes.listBox}>
                <ListItem button disabled={item[3]} key={item[1]} component='a' href={item[2]}>
                  <ListItemIcon style={{ textAlign: 'left', justifySelf: 'flex-start' }}>
                    {/* <i class='fas fa-rocket fa-lg'></i> */}
                    <Typography style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: '1.5rem' }}>
                      {item[0]}
                    </Typography>
                  </ListItemIcon>
                  <ListItemText primary={item[1]} classes={{ primary: classes.listItemText }}></ListItemText>
                </ListItem>
              </Box>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
