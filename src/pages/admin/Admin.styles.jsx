import { makeStyles } from '@material-ui/core/styles';

export const drawerWidth = 250;

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },

  drawer: {
    maxWidth: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    maxWidth: drawerWidth,
    backgroundColor: '#f5f5f5',
  },

  toolbar: theme.mixins.toolbar,

  appbar_toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },

  listBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '10px',
  },

  search: {
    justifySelf: 'flex-start',
    backgroundColor: '#f5f5f5',
    borderRadius: '7.5px',
    height: 40,
    width: 300,
  },

  listItemText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#757575',
    fontSize: '1.05rem',
  },
}));
