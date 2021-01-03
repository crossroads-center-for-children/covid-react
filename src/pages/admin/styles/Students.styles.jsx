import { makeStyles } from '@material-ui/core/styles';
import { navbarHeight } from '../../../components/Navbar';
import { drawerWidth } from '../../../layouts/styles/Admin.styles';

export const useStyles = makeStyles(theme => ({
  root: {
    marginTop: navbarHeight,
    marginLeft: drawerWidth,
    width: `calc(100vw = ${drawerWidth}px)`,
    height: `calc(100vh - ${navbarHeight}px)`,
  },

  table: {
    width: '100%',
  },
}));
