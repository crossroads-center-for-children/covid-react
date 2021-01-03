import { makeStyles } from '@material-ui/core/styles';

export const navbarHeight = 100;

export const useStyles = makeStyles(theme => ({
  'root--admin': {
    display: 'flex',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 20,
    height: navbarHeight,
    boxShadow: 'none',
  },

  'root--user': {
    display: 'flex',
    backgroundColor: '#171c28',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    height: navbarHeight,
    boxShadow: 'none',
  },
}));
