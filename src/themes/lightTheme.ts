import { createTheme } from '@mui/material';
import colors from './colors';

const { black, white, blue, darkBlue, lightBlue } = colors;

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    common: { black, white },
    primary: {
      main: blue,
      light: lightBlue,
      dark: darkBlue,
      contrastText: white,
    },
    text: {
      primary: black,
    },
    background: {
      paper: white,
      default: white,
    },
  },
});

export default lightTheme;
