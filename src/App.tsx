import lightTheme from '@/themes/lightTheme';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
