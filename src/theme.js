import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#156FE5',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#000',
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
