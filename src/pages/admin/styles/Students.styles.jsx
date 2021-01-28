import { makeStyles } from '@material-ui/core/styles';
import { navbarHeight } from '../../../components/Navbar';
import { drawerWidth } from '../../../layouts/styles/Admin.styles';

export const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: drawerWidth,
    width: `calc(100vw - ${drawerWidth}px - 40px)`,
    paddingLeft: 20,
    paddingRight: 20,
  },

  table: {
    width: '100%',
  },
}));
