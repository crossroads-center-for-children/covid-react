import { makeStyles } from '@material-ui/core/styles';
import { navbarHeight } from '../../../components/Navbar';
import { drawerWidth } from '../../../layouts/styles/Admin.styles';

export const useStyles = makeStyles(theme => ({
  root: {
    marginTop: navbarHeight,
    marginLeft: drawerWidth,
    backgroundColor: 'black',
    width: '100vw',
    height: '100vh',
  },
}));
