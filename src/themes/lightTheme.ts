import { createTheme } from '@mui/material';
import colors from './colors';

const {
  white,
  customBlack,
  customWhite,
  blue,
  darkBlue,
  lightBlue,
  darkPink,
  duskPink,
  pink,
} = colors;

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    common: { black: customBlack, white: customWhite },
    primary: {
      main: blue,
      light: lightBlue,
      dark: darkBlue,
      contrastText: customWhite,
    },
    secondary: {
      main: darkPink,
      light: pink,
      dark: duskPink,
      contrastText: white,
    },
    text: {
      primary: customBlack,
    },
    background: {
      paper: customWhite,
      default: customWhite,
    },
  },
});

export default lightTheme;
