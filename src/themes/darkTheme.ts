import { createTheme } from '@mui/material';
import colors from './colors';

const { black, white, darkBlue, brightBlue, duskBlue } = colors;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    common: { black, white },
    primary: {
      main: darkBlue,
      light: brightBlue,
      dark: duskBlue,
      contrastText: white,
    },
    text: {
      primary: white,
    },
    background: {
      paper: black,
      default: black,
    },
  },
});

export default darkTheme;
